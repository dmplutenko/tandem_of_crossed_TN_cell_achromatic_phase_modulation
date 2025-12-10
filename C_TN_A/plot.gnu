# --- Configuration for LaTeX Output ---
#set terminal cairolatex eps size 9cm, 6cm dashed dl 2 font "cmr,9"
set terminal cairolatex eps size 12cm, 7cm dashed dl 2 font "12"
set output 'plot.tex'

# --- Styles ---

set style line 1 lt 1 lc rgb "#BBBBBB" lw 16


set style line 11 lt 1 lc rgb "#000000" lw 6


set style line 2 lt 1 lc rgb "#D55E00" lw 6 dt (15,10)


set style line 3 lt 1 lc rgb "#002282" lw 6 dt (3,5)


set style line 4 lt 1 lc rgb "black" lw 4 dt (15,5,2,5)

# Grid
set style line 101 lt 1 lc rgb "#DDDDDD" lw 1
set grid ls 101

# --- Layout ---
set tmargin 1
set bmargin 3
set lmargin 8
set rmargin 2

set xlabel "Wavelength $\\lambda$ [nm]"
set ylabel "Transmission Loss $1-|T|$"
#set key top right box opaque width 1 height 1
# --- Legend Fix ---
# width 6: Додає простір для широкого тексту LaTeX.
# spacing 1.3: Додає повітря між рядками легенди.
# samplen 3: Збільшує довжину прикладу лінії, щоб було краще видно патерн штриха.
set key top right box opaque width 3 height 1 spacing 1 samplen 5

# --- Ranges ---
set xrange [450:750]
# set yrange [0:0.05] # Adjust based on your max loss (for b=0.02, max ~ 0.02^2/2 * Phi^2 ~ small?)
# Note: Якщо втрати дуже малі, Gnuplot сам підбере масштаб, або можна задати set autoscale y

# --- Plotting ---
# Col 1: lambda
# Col 2: 1-|T_exact|
# Col 3: 1-|T_eq1| (1st order)
# Col 4: 1-|T_eq2| (2nd order)
# Col 5: FoM (A)

set logscale y 10
set format y "10^{%L}"

set yrange [0.00001:0.01]




plot "results.txt" using 1:2 title "Exact Numerical" w l ls 11, \
     "results.txt" using 1:3 title "FoM Bound ($\\mathcal{A}^{\\left(\\text{A}\\right)}$)" w l ls 2
