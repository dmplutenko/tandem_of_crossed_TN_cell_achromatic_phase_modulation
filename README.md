# Numerical Simulations for Compensated Tandem TN Cells

This repository contains the source code and numerical simulation scripts associated with the research paper: **"Generation of Perfectly Achromatic Optical Vortices using a Compensated Tandem Twisted Nematic Cell"**.

The code performs calculations for light propagation through various configurations of tandem Twisted Nematic (TN) liquid crystal cells using the Jones matrix formalism. It also implements approximation formulas (first and second order) derived in the paper.

## Repository Structure

The repository is organized into three main directories, each corresponding to a specific simulation scenario discussed in the paper:

1.  **`C_TN`**: Simulations for an **Uncompensated** Tandem TN cell.
2.  **`C_TN_A`**: Simulations for a Tandem TN cell with **Active Compensation** (Strategy A).
3.  **`C_TN_compare`**: Comparative analysis of Uncompensated, Active (Strategy A), and Passive (Strategy B) compensation schemes.

## Prerequisites

To run the simulations and generate the plots, you need the following software installed:

* **Node.js**: For running the calculation logic (`calculate.js`).
* **Gnuplot**: For plotting the data (`.gnu` scripts).
* **Python 3**: For converting Gnuplot `.tex` output to PDF (via the `textoimage` script).
* **LaTeX**: Required by the `textoimage` script to render labels.

## Installation and Usage

The workflow is identical for all three folders.

1.  Navigate to the desired folder (e.g., `C_TN`, `C_TN_A`, `C_TN_compare`):
    ```bash
    cd C_TN
    ```
2.  Install the required Node.js dependencies:
    ```bash
    npm install
    ```
3.  Run the automation script:
    ```bash
    ./createImages.sh
    ```

**What the script does:**
1.  Executes `calculate.js` to perform physics calculations.
2.  Saves raw data to `results.txt`.
3.  Runs `gnuplot` to visualize data.
4.  Executes the `textoimage` python utility to generate final PDF figures.

---

## Detailed Description of Calculations

**Note:** All simulations assume a target phase modulation of **PI ($\pi$)**. This parameter is currently hardcoded in the `show_graph` function within `calculate.js`.

### 1. Folder: `C_TN` (Uncompensated System)

**Input Parameters (`calculate.js`):**
The simulation is configured with: `show_graph(5000, 0.2, 10000, 0.02, 450, 750)`
* Points: 5000
* $\Delta n$ ($n_e - n_o$): 0.2
* Average cell thickness ($h$): 10,000 nm ($10 \mu m$)
* Thickness mismatch parameter ($b$): 0.02
* Spectral range: 450 nm – 750 nm

**Output Data (`results.txt` columns):**
1.  Wavelength (nm)
2.  Amplitude (Exact Jones Matrix)
3.  Amplitude (1st order approx)
4.  Amplitude (2nd order approx)
5.  Amplitude (Figure of Merit - FoM)
6.  Phase (Exact Jones Matrix)
7.  Phase (1st order approx)
8.  Phase (2nd order approx)
9.  Phase (FoM, assuming target modulation $\pi$)
10. Gamma ($\gamma$)
11. Gamma prime 1 ($\gamma'_1$)
12. Gamma prime 2 ($\gamma'_2$)
13. Alpha ($\alpha$)
14. Beta ($\beta$)
15. Fs (Sum phase retardation)
16. Fd (Difference phase retardation)

### 2. Folder: `C_TN_A` (Active Compensation)

**Input Parameters (`calculate.js`):**
The simulation is configured with: `show_graph(5000, 0.2, 100000, 0.05, 450, 750)`
* Points: 5000
* $\Delta n$ ($n_e - n_o$): 0.2
* Average cell thickness ($h$): 100,000 nm ($100 \mu m$)
* Thickness mismatch parameter ($b$): 0.05
* Spectral range: 450 nm – 750 nm

**Output Data (`results.txt` columns):**
1.  Wavelength (nm)
2.  Amplitude (Exact Jones Matrix - Active Comp)
3.  Amplitude (FoM - Active Comp)
4.  Phase (Exact Jones Matrix - Active Comp)
5.  Phase (FoM - Active Comp, target $\pi$)
6.  Gamma ($\gamma$)
7.  Gamma prime 1 ($\gamma'_1$)
8.  Gamma prime 2 ($\gamma'_2$)
9.  Alpha ($\alpha$)
10. Beta ($\beta$)
11. Fs (Sum phase retardation)
12. Fd (Difference phase retardation)

### 3. Folder: `C_TN_compare` (Comparative Analysis)

**Input Parameters (`calculate.js`):**
The simulation is configured with: `show_graph(5000, 0.2, 10000, 0.02, 100000, 0.05, 450, 750, 600)`
* Points: 5000
* $\Delta n$: 0.2
* **Uncompensated & Passive:** $h=10 \mu m$, $b=0.02$
* **Active Comparison:** $h=100 \mu m$, $b=0.05$
* Spectral range: 450 nm – 750 nm
* Passive Optimization Wavelength: 600 nm (Strategy B phase compensation point)

**Output Data (`results.txt` columns):**
1.  Wavelength (nm)
2.  Amplitude FoM (Uncompensated)
3.  Amplitude FoM (Active Compensation)
4.  Amplitude FoM (Passive Compensation / Strategy B)
5.  Phase FoM (Uncompensated)
6.  Phase FoM (Active Compensation)
7.  Phase FoM (Passive Compensation / Strategy B)
8.  Gamma ($\gamma$)
9.  Gamma prime 1 ($\gamma'_1$)
10. Gamma prime 2 ($\gamma'_2$)
11. Alpha ($\alpha$) for Uncompensated/Passive
12. Alpha ($\alpha$) for Active
13. Beta ($\beta$)
14. Fs (Sum phase retardation)
15. Fd (Difference phase retardation)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.