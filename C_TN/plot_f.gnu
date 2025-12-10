# --- Configuration ---
#set terminal cairolatex eps size 9cm, 6cm dashed dl 2 font "cmr,9"
set terminal cairolatex eps size 12cm, 7cm dashed dl 2 font "12"
set output 'plot_f.tex'

# --- Styles (Same palette) ---

# --- Styles ---

set style line 1 lt 1 lc rgb "#BBBBBB" lw 16


set style line 2 lt 1 lc rgb "#D55E00" lw 6 dt (15,10)


set style line 3 lt 1 lc rgb "#002282" lw 6 dt (3,5)


set style line 4 lt 1 lc rgb "black" lw 4 dt (15,5,2,5)


set style line 101 lt 1 lc rgb "#DDDDDD" lw 1
set grid ls 101

# --- Layout ---
set tmargin 1
set bmargin 3
set lmargin 8
set rmargin 2

set xlabel "Wavelength $\\lambda$ [nm]"
set ylabel "Phase Error $\\delta\\varphi$ [rad]"
#set key bottom right box opaque
#set key top right box opaque width 3 height 1 spacing 1 samplen 5

set key at screen 0.55, 0.93 center top horizontal box opaque width 2 height 1 spacing 1 samplen 3

set xrange [450:750]

set yrange [-0.2:0.35]

# --- Plotting ---
# Col 1: lambda
# Col 6: Phase Error Exact
# Col 7: Phase Error Approx (1st/2nd order same for phase)
# Col 9: FoM (P1 magnitude)

#\mathcal{P}_{1}^{\left(0\right)}

# We plot +FoM and -FoM to show the envelope
plot "results.txt" using 1:6 title "Exact Numerical" w l ls 1, \
     "results.txt" using 1:8 title "Analytical Approx." w l ls 2, \
     "results.txt" using 1:9 title "FoM Envelope ($\\pm\\pi\\mathcal{P}_1^{\\left(0\\right)}$)" w l ls 4, \
     "results.txt" using 1:(-$9) notitle w l ls 4
