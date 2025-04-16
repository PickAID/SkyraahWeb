<template>
    <div class="runescribing-editor">
        <h2 class="editor-title">Rune Scribing-Editor</h2>

        <div class="editor-container">
            <div class="canvas-section">
                <div class="canvas-wrapper">
                    <canvas
                        ref="canvas"
                        class="editor-canvas"
                        width="450"
                        height="450"
                        @click="handleClick"
                        @mousemove="handleMouseMove"
                    ></canvas>
                </div>

                <div class="canvas-controls">
                    <div class="instructions">
                        Click on the lines to toggle them on/off.
                    </div>

                    <div class="sensitivity-control">
                        <span>Click Tolerance: {{ clickTolerance }}</span>
                        <input
                            type="range"
                            min="5"
                            max="20"
                            v-model.number="clickTolerance"
                            @input="redrawGrid"
                        />
                    </div>

                    <div class="debug-info" v-if="showDebug">
                        <pre>{{ debugText }}</pre>
                    </div>
                </div>
            </div>

            <div class="controls-section">
                <div class="buttons">
                    <button class="control-btn" @click="clearGrid">
                        Clear Grid
                    </button>
                    <button class="control-btn" @click="fillAll">
                        Fill Grid
                    </button>
                </div>

                <div class="values-section">
                    <div class="value-group">
                        <h3>Horizontal</h3>
                        <div class="value-row">
                            <span>Decimal:</span>
                            <input type="text" readonly :value="hDecimal" />
                            <button @click="copyToClipboard(hDecimal)">
                                copy
                            </button>
                        </div>
                        <div class="value-row">
                            <span>Binary:</span>
                            <input type="text" readonly :value="hBinary" />
                        </div>
                    </div>

                    <div class="value-group">
                        <h3>Vertical</h3>
                        <div class="value-row">
                            <span>Decimal:</span>
                            <input type="text" readonly :value="vDecimal" />
                            <button @click="copyToClipboard(vDecimal)">
                                copy
                            </button>
                        </div>
                        <div class="value-row">
                            <span>Binary:</span>
                            <input type="text" readonly :value="vBinary" />
                        </div>
                    </div>
                </div>

                <div class="code-section">
                    <h3>Json Code</h3>
                    <textarea readonly v-model="javaCode"></textarea>
                    <button class="copy-btn" @click="copyToClipboard(javaCode)">
                        Copy Json Code
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed, reactive, watch } from "vue";

    const canvas = ref(null);
    const ctx = ref(null);
    const showDebug = ref(true);
    const clickTolerance = ref(12);

    const rows = 7;
    const cols = 8;
    const totalPositions = rows * cols;

    let hLines = Array(rows + 1)
        .fill()
        .map(() => Array(cols).fill(false));
    let vLines = Array(rows)
        .fill()
        .map(() => Array(cols + 1).fill(false));

    for (let i = 0; i < cols; i++) {
        hLines[0][i] = null;
        hLines[rows][i] = null;
    }

    for (let i = 0; i < rows; i++) {
        vLines[i][0] = null;
        vLines[i][cols] = null;
    }

    const canvasWidth = 450;
    const canvasHeight = 450;
    const cellWidth = canvasWidth / cols;
    const cellHeight = canvasHeight / rows;

    let currentHighlight = null;

    const hValue = ref(0n);
    const vValue = ref(0n);
    const hDecimal = computed(() => hValue.value.toString());
    const vDecimal = computed(() => vValue.value.toString());
    const hBinary = computed(() => hValue.value.toString(2));
    const vBinary = computed(() => vValue.value.toString(2));

    const javaCode = computed(() => {
        return `{
	"type": "mna:runescribing",
	"tier": ,
	"mutex_h": ${hValue.value},
	"mutex_v": ${vValue.value},
	"output": ""
}`;
    });

    const debugText = computed(() => {
        const maxValue = (1n << 56n) - 1n;
        const maxBin = maxValue.toString(2).padStart(56, "0");
        const hBin = hValue.value.toString(2).padStart(56, "0");
        const vBin = vValue.value.toString(2).padStart(56, "0");

        return `When Fill (72057594037927935):\n${maxBin}\n\nCurrent Horizontal:\n${hBin}\n\Current Vertical:\n${vBin}`;
    });

    onMounted(() => {
        if (canvas.value) {
            ctx.value = canvas.value.getContext("2d");
            drawGrid();
        }
    });

    watch(clickTolerance, () => {
        redrawGrid();
    });

    function redrawGrid() {
        if (ctx.value) {
            drawGrid();
        }
    }

    function drawGrid() {
        ctx.value.clearRect(0, 0, canvasWidth, canvasHeight);

        drawGridBackground();
        drawGridLines();
        calculateLongValues();
    }

    function drawGridBackground() {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const x1 = j * cellWidth;
                const y1 = i * cellHeight;
                const x2 = (j + 1) * cellWidth;
                const y2 = (i + 1) * cellHeight;

                ctx.value.fillStyle = "#c19a6b";
                ctx.value.fillRect(x1, y1, x2 - x1, y2 - y1);

                ctx.value.strokeStyle = "#a58457";
                ctx.value.lineWidth = 1;
                ctx.value.strokeRect(x1, y1, x2 - x1, y2 - y1);

                const padding = 3;

                ctx.value.beginPath();
                ctx.value.moveTo(x1 + padding, y1 + padding);
                ctx.value.lineTo(x2 - padding, y1 + padding);
                ctx.value.strokeStyle = "#a58457";
                ctx.value.stroke();

                ctx.value.beginPath();
                ctx.value.moveTo(x1 + padding, y1 + padding);
                ctx.value.lineTo(x1 + padding, y2 - padding);
                ctx.value.strokeStyle = "#a58457";
                ctx.value.stroke();

                ctx.value.beginPath();
                ctx.value.moveTo(x2 - padding, y1 + padding);
                ctx.value.lineTo(x2 - padding, y2 - padding);
                ctx.value.strokeStyle = "#d1aa7b";
                ctx.value.stroke();

                ctx.value.beginPath();
                ctx.value.moveTo(x1 + padding, y2 - padding);
                ctx.value.lineTo(x2 - padding, y2 - padding);
                ctx.value.strokeStyle = "#d1aa7b";
                ctx.value.stroke();
            }
        }

        for (let i = 0; i <= rows; i++) {
            for (let j = 0; j <= cols; j++) {
                const x = j * cellWidth;
                const y = i * cellHeight;

                ctx.value.beginPath();
                ctx.value.arc(x, y, 3, 0, Math.PI * 2);
                ctx.value.fillStyle = "#303030";
                ctx.value.fill();
            }
        }
    }

    function drawGridLines() {
        for (let i = 0; i <= rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (hLines[i][j] !== null && hLines[i][j]) {
                    const x1 = j * cellWidth;
                    const y1 = i * cellHeight;
                    const x2 = (j + 1) * cellWidth;
                    const y2 = i * cellHeight;

                    ctx.value.beginPath();
                    ctx.value.moveTo(x1, y1);
                    ctx.value.lineTo(x2, y2);
                    ctx.value.strokeStyle = "#ffaa00";
                    ctx.value.lineWidth = 4;
                    ctx.value.stroke();
                }
            }
        }

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j <= cols; j++) {
                if (vLines[i][j] !== null && vLines[i][j]) {
                    const x1 = j * cellWidth;
                    const y1 = i * cellHeight;
                    const x2 = j * cellWidth;
                    const y2 = (i + 1) * cellHeight;

                    ctx.value.beginPath();
                    ctx.value.moveTo(x1, y1);
                    ctx.value.lineTo(x2, y2);
                    ctx.value.strokeStyle = "#ffaa00";
                    ctx.value.lineWidth = 4;
                    ctx.value.stroke();
                }
            }
        }

        if (currentHighlight) {
            const [lineType, i, j] = currentHighlight;

            if (lineType === "h" && hLines[i][j] !== null) {
                const x1 = j * cellWidth;
                const y1 = i * cellHeight;
                const x2 = (j + 1) * cellWidth;
                const y2 = i * cellHeight;

                ctx.value.beginPath();
                ctx.value.moveTo(x1, y1);
                ctx.value.lineTo(x2, y2);
                ctx.value.strokeStyle = "#ffffff";
                ctx.value.lineWidth = 2;
                ctx.value.stroke();
            } else if (lineType === "v" && vLines[i][j] !== null) {
                const x1 = j * cellWidth;
                const y1 = i * cellHeight;
                const x2 = j * cellWidth;
                const y2 = (i + 1) * cellHeight;

                ctx.value.beginPath();
                ctx.value.moveTo(x1, y1);
                ctx.value.lineTo(x2, y2);
                ctx.value.strokeStyle = "#ffffff";
                ctx.value.lineWidth = 2;
                ctx.value.stroke();
            }
        }
    }

    function isCompletelyFilled() {
        for (let i = 0; i <= rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (hLines[i][j] !== null && !hLines[i][j]) {
                    return false;
                }
            }
        }

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j <= cols; j++) {
                if (vLines[i][j] !== null && !vLines[i][j]) {
                    return false;
                }
            }
        }

        return true;
    }

    function calculateLongValues() {
        const maxValue = (1n << 56n) - 1n;

        if (isCompletelyFilled()) {
            hValue.value = maxValue;
            vValue.value = maxValue;
            return;
        }

        let h = 0n;
        let v = 0n;

        for (let pos = 0; pos < totalPositions; pos++) {
            const i = Math.floor(pos / cols);
            const j = pos % cols;

            const hRow = i + 1;
            const hCol = j;

            const vRow = i;
            const vCol = j + 1;

            if (0 <= hRow && hRow < rows + 1 && 0 <= hCol && hCol < cols) {
                if (hLines[hRow][hCol] !== null && hLines[hRow][hCol]) {
                    h |= 1n << BigInt(pos);
                }
            }

            if (0 <= vRow && vRow < rows && 0 <= vCol && vCol < cols + 1) {
                if (vLines[vRow][vCol] !== null && vLines[vRow][vCol]) {
                    v |= 1n << BigInt(pos);
                }
            }
        }

        hValue.value = h;
        vValue.value = v;
    }

    function findNearestLine(x, y) {
        let minDistance = Infinity;
        let nearestLine = null;

        for (let i = 0; i <= rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (hLines[i][j] !== null) {
                    const hX = (j + 0.5) * cellWidth;
                    const hY = i * cellHeight;

                    const lineX1 = j * cellWidth;
                    const lineX2 = (j + 1) * cellWidth;

                    let distance;

                    if (lineX1 <= x && x <= lineX2) {
                        distance = Math.abs(y - hY);
                    } else {
                        const dist1 = Math.sqrt(
                            (x - lineX1) ** 2 + (y - hY) ** 2
                        );
                        const dist2 = Math.sqrt(
                            (x - lineX2) ** 2 + (y - hY) ** 2
                        );
                        distance = Math.min(dist1, dist2);
                    }

                    if (
                        distance < minDistance &&
                        distance < clickTolerance.value
                    ) {
                        minDistance = distance;
                        nearestLine = ["h", i, j];
                    }
                }
            }
        }

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j <= cols; j++) {
                if (vLines[i][j] !== null) {
                    const vX = j * cellWidth;
                    const vY = (i + 0.5) * cellHeight;

                    const lineY1 = i * cellHeight;
                    const lineY2 = (i + 1) * cellHeight;

                    let distance;

                    if (lineY1 <= y && y <= lineY2) {
                        distance = Math.abs(x - vX);
                    } else {
                        const dist1 = Math.sqrt(
                            (x - vX) ** 2 + (y - lineY1) ** 2
                        );
                        const dist2 = Math.sqrt(
                            (x - vX) ** 2 + (y - lineY2) ** 2
                        );
                        distance = Math.min(dist1, dist2);
                    }

                    if (
                        distance < minDistance &&
                        distance < clickTolerance.value
                    ) {
                        minDistance = distance;
                        nearestLine = ["v", i, j];
                    }
                }
            }
        }

        return nearestLine;
    }

    function handleMouseMove(event) {
        const rect = canvas.value.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const nearestLine = findNearestLine(x, y);

        if (JSON.stringify(nearestLine) !== JSON.stringify(currentHighlight)) {
            currentHighlight = nearestLine;
            drawGrid();
        }
    }

    function handleClick(event) {
        const rect = canvas.value.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const nearestLine = findNearestLine(x, y);

        if (nearestLine) {
            const [lineType, i, j] = nearestLine;

            if (lineType === "h" && hLines[i][j] !== null) {
                hLines[i][j] = !hLines[i][j];
                drawGrid();
            } else if (lineType === "v" && vLines[i][j] !== null) {
                vLines[i][j] = !vLines[i][j];
                drawGrid();
            }
        }
    }

    function clearGrid() {
        for (let i = 0; i <= rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (hLines[i][j] !== null) {
                    hLines[i][j] = false;
                }
            }
        }

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j <= cols; j++) {
                if (vLines[i][j] !== null) {
                    vLines[i][j] = false;
                }
            }
        }

        drawGrid();
    }

    function fillAll() {
        for (let i = 0; i <= rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (hLines[i][j] !== null) {
                    hLines[i][j] = true;
                }
            }
        }

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j <= cols; j++) {
                if (vLines[i][j] !== null) {
                    vLines[i][j] = true;
                }
            }
        }

        drawGrid();
    }

    function copyToClipboard(text) {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                alert("已复制到剪贴板");
            })
            .catch((err) => {
                console.error("复制失败:", err);
            });
    }
</script>

<style>
    .runescribing-editor {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif;
        max-width: 900px;
        margin: 0 auto;
        color: #e0e0e0;
    }

    .editor-title {
        text-align: center;
        margin-bottom: 1.5rem;
        font-size: 1.8rem;
        font-weight: bold;
    }

    .editor-container {
        display: flex;
        gap: 20px;
        background-color: #2c2c2c;
        padding: 20px;
        border-radius: 8px;
    }

    .canvas-section {
        flex: 3;
        display: flex;
        flex-direction: column;
    }

    .canvas-wrapper {
        background-color: #3c3c3c;
        padding: 10px;
        border-radius: 8px;
    }

    .editor-canvas {
        display: block;
        margin: 0 auto;
        border-radius: 4px;
    }

    .canvas-controls {
        background-color: #3c3c3c;
        padding: 10px;
        margin-top: 10px;
        border-radius: 8px;
    }

    .instructions {
        font-size: 0.9rem;
        margin-bottom: 10px;
    }

    .sensitivity-control {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
    }

    .sensitivity-control input {
        flex: 1;
    }

    .debug-info {
        font-family: monospace;
        font-size: 0.75rem;
        background-color: #262626;
        padding: 8px;
        border-radius: 4px;
        max-height: 150px;
        overflow-y: auto;
    }

    .controls-section {
        flex: 2;
        display: flex;
        flex-direction: column;
        gap: 15px;
        background-color: #3c3c3c;
        padding: 15px;
        border-radius: 8px;
    }

    .buttons {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .control-btn {
        padding: 8px 12px;
        background-color: #555555;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
    }

    .control-btn:hover {
        background-color: #666666;
    }

    .values-section {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .value-group {
        background-color: #444444;
        padding: 10px;
        border-radius: 6px;
    }

    .value-group h3 {
        margin-top: 0;
        margin-bottom: 10px;
        font-size: 1rem;
        border-bottom: 1px solid #555555;
        padding-bottom: 5px;
    }

    .value-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
    }

    .value-row span {
        width: 60px;
        font-size: 0.9rem;
    }

    .value-row input {
        flex: 1;
        background-color: #555555;
        color: white;
        border: none;
        padding: 4px 8px;
        border-radius: 3px;
        font-size: 0.85rem;
        font-family: monospace;
    }

    .value-row button {
        background-color: #666666;
        color: white;
        border: none;
        padding: 4px 8px;
        border-radius: 3px;
        cursor: pointer;
        font-size: 0.85rem;
    }

    .code-section {
        background-color: #444444;
        padding: 10px;
        border-radius: 6px;
    }

    .code-section h3 {
        margin-top: 0;
        margin-bottom: 10px;
        font-size: 1rem;
        border-bottom: 1px solid #555555;
        padding-bottom: 5px;
    }

    .code-section textarea {
        width: 100%;
        height: 150px;
        background-color: #555555;
        color: white;
        border: none;
        padding: 8px;
        border-radius: 4px;
        font-family: monospace;
        font-size: 0.85rem;
        resize: none;
        margin-bottom: 10px;
    }

    .copy-btn {
        width: 100%;
        padding: 8px;
        background-color: #666666;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
    }

    .copy-btn:hover {
        background-color: #777777;
    }
</style>
