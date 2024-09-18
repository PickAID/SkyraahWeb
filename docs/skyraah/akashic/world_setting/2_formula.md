---
title: 公式
---

# {{$frontmatter.title}}

***

&emsp;&emsp;笔者为了使得“信息态”这一虚拟设定更真实，设定了一系列公式

:::tabs

==信息态传播公式

&emsp;&emsp;信息态在相互传播时对观测者传播的信息量计算公式  
$$
m\cdot\prod_{i=1}^{n\geqslant1} q_t\downarrow_i \impliedby (q_n\updownarrow)^n
$$

==熵值推导公式

&emsp;&emsp;通过信息态接收计算熵增的公式，变量$n$为接收的信息态总数，变量$m$为某信息态在传播过程中被接收的总数  
$$
q\downarrow_i \implies \sum_{i=1}^{n\geqslant1} \frac{\log_2m}{m}
$$

&emsp;&emsp;通过信息态传播计算熵增的公式，变量$n$为该信息态被接收的总数  
$$
q\uparrow_n \implies H(X)=\frac{\log_2n}{n}
$$


:::