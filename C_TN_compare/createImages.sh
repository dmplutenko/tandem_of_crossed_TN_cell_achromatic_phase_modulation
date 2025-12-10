rm -f *.pdf
rm -f *.eps
rm -f plot.jpg
rm -f plot_grey.jpg
rm -f plot_f.jpg
rm -f plot_f_grey.jpg

node calculate.js > results.txt

gnuplot plot.gnu
./textoimage plot.tex -o plot.pdf


rm -f plot.tex
rm -f plot-eps-converted-to.pdf
rm -f plot.eps


gnuplot plot_f.gnu
./textoimage plot_f.tex -o plot_f.pdf


rm -f plot_f.tex
rm -f plot_f-eps-converted-to.pdf
rm -f plot_f.eps

convert -density 600 plot.pdf -colorspace Gray plot_grey.jpg
convert -density 600 plot.pdf plot.jpg

convert -density 600 plot_f.pdf -colorspace Gray plot_f_grey.jpg
convert -density 600 plot_f.pdf plot_f.jpg

cp plot.pdf plot_compare.pdf
cp plot_f.pdf plot_f_compare.pdf