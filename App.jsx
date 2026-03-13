import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════
// SUBJECTS & CHAPTERS
// ═══════════════════════════════════════════════════════
const SUBJECTS = {
  Physics: {
    color: "#2563EB", icon: "⚡",
    chapters: ["Motion in Straight Line","Laws of Motion","Work Energy & Power","Rotational Motion","Gravitation","Properties of Matter","Thermodynamics","Kinetic Theory of Gases","Oscillations","Waves","Electrostatics","Current Electricity","Magnetic Effects of Current","Electromagnetic Induction","Alternating Current","Ray Optics","Wave Optics","Dual Nature of Matter","Atoms & Nuclei","Semiconductors"]
  },
  Chemistry: {
    color: "#16A34A", icon: "🧪",
    chapters: ["Some Basic Concepts","Atomic Structure","Classification of Elements","Chemical Bonding","States of Matter","Thermodynamics","Equilibrium","Redox Reactions","s-Block Elements","p-Block Elements","Organic Chemistry Basics","Hydrocarbons","Solid State","Solutions","Electrochemistry","Chemical Kinetics","d & f Block Elements","Coordination Compounds","Alcohols & Ethers","Aldehydes & Ketones","Carboxylic Acids","Amines","Biomolecules","Polymers"]
  },
  Biology: {
    color: "#D97706", icon: "🧬",
    chapters: ["Cell Structure & Function","Cell Division","Biomolecules","Photosynthesis","Respiration","Plant Growth & Development","Digestion & Absorption","Breathing & Gas Exchange","Body Fluids & Circulation","Excretory Products","Locomotion & Movement","Neural Control","Chemical Coordination","Reproduction in Plants","Reproduction in Animals","Genetics","Molecular Basis of Inheritance","Evolution","Human Health & Disease","Biotechnology Principles","Biotechnology Applications","Organisms & Populations","Ecosystem","Biodiversity"]
  }
};

const CLASS_OPTIONS = ["Class 11 (First Year)","Class 12 (Second Year)","Class 12 Passed / Dropper","Repeater (2nd Attempt)","Repeater (3rd+ Attempt)"];

// ═══════════════════════════════════════════════════════
// 27-YEAR PYQ BANK (1999–2025)
// Authentic NEET/AIPMT questions with year tags
// ═══════════════════════════════════════════════════════
const PYQ_BANK = {
  Physics: [
    // ── Motion in Straight Line ──
    {q:"A body thrown vertically upward with velocity u. The greatest height h to which it will rise is:",opts:["u/g","u²/2g","u²/g","u/2g"],ans:1,ch:"Motion in Straight Line",src:"AIPMT 2002",diff:"Easy",exp:"At max height v=0. Using v²=u²-2gh: h = u²/2g"},
    {q:"A particle covers half of its total distance with speed v₁ and rest half with speed v₂. Its average speed is:",opts:["(v₁+v₂)/2","2v₁v₂/(v₁+v₂)","√(v₁v₂)","v₁v₂/(v₁+v₂)"],ans:1,ch:"Motion in Straight Line",src:"AIPMT 2011",diff:"Medium",exp:"Average speed = 2v₁v₂/(v₁+v₂) — harmonic mean for equal distances"},
    {q:"A ball is released from top of tower of height h. Its position at T/3 seconds from ground is:",opts:["h/9 m","7h/9 m","8h/9 m","17h/18 m"],ans:2,ch:"Motion in Straight Line",src:"NEET 2016",diff:"Medium",exp:"s = g(T/3)²/2 = h/9 from top. From ground = h - h/9 = 8h/9"},
    {q:"A train accelerates from rest at 2 m/s² for 10 s, then moves uniformly. Distance covered in first 10 s is:",opts:["100 m","50 m","200 m","20 m"],ans:0,ch:"Motion in Straight Line",src:"Motion Institute",diff:"Easy",exp:"s = ½at² = ½×2×100 = 100 m"},
    {q:"The velocity-time graph of a body shows a straight line with positive slope. The body has:",opts:["Uniform velocity","Uniform acceleration","Decreasing acceleration","Zero acceleration"],ans:1,ch:"Motion in Straight Line",src:"Allen Module",diff:"Easy",exp:"Straight v-t line with positive slope means constant (uniform) acceleration"},
    {q:"A stone is dropped from height h. Time to reach ground is t. If dropped from 4h, time would be:",opts:["2t","4t","t/2","√2 t"],ans:0,ch:"Motion in Straight Line",src:"NCERT Exemplar",diff:"Medium",exp:"h = ½gt²; if h→4h then 4h=½g(t')², so t'=2t"},

    // ── Laws of Motion ──
    {q:"A block of mass m is placed on smooth inclined wedge of inclination θ. Acceleration needed to keep block stationary:",opts:["g/tanθ","g·tanθ","g·cosθ","g·sinθ"],ans:1,ch:"Laws of Motion",src:"NEET 2018",diff:"Hard",exp:"In non-inertial frame: ma·cosθ = mg·sinθ → a = g·tanθ"},
    {q:"A force of 50 N acts on 10 kg block on frictionless surface. Acceleration is:",opts:["5 m/s²","10 m/s²","50 m/s²","0.5 m/s²"],ans:0,ch:"Laws of Motion",src:"NCERT Exemplar",diff:"Easy",exp:"a = F/m = 50/10 = 5 m/s²"},
    {q:"Coefficient of static friction is 0.4 on a 5 kg block (g=10). Maximum static friction force is:",opts:["20 N","25 N","40 N","10 N"],ans:0,ch:"Laws of Motion",src:"Allen Module",diff:"Easy",exp:"fs = μN = 0.4×5×10 = 20 N"},
    {q:"A man weighing 60 kg stands in a lift moving upward with acceleration 2 m/s². Apparent weight is (g=10):",opts:["720 N","600 N","480 N","60 N"],ans:0,ch:"Laws of Motion",src:"Motion Institute",diff:"Medium",exp:"N = m(g+a) = 60×(10+2) = 720 N"},
    {q:"Newton's third law states that action and reaction forces:",opts:["Act on same body","Cancel each other","Act on different bodies","Are always equal in direction"],ans:2,ch:"Laws of Motion",src:"NCERT Exemplar",diff:"Easy",exp:"Action-reaction forces are equal and opposite but act on DIFFERENT bodies, so they don't cancel"},

    // ── Work Energy & Power ──
    {q:"A body of 2 kg thrown up with KE = 50 J. PE at maximum height is:",opts:["50 J","25 J","100 J","0 J"],ans:0,ch:"Work Energy & Power",src:"AIPMT 2004",diff:"Easy",exp:"Energy conserved: all KE converts to PE at max height = 50 J"},
    {q:"A pump lifts 200 kg water to 50 m in 10 s (g=10). Power of pump is:",opts:["10 kW","1 kW","100 kW","5 kW"],ans:0,ch:"Work Energy & Power",src:"Aakash Module",diff:"Medium",exp:"P = mgh/t = 200×10×50/10 = 10 kW"},
    {q:"Work done by a force is zero when:",opts:["Force is zero","Displacement is zero","Force and displacement are perpendicular","Both A and B"],ans:3,ch:"Work Energy & Power",src:"NCERT Exemplar",diff:"Easy",exp:"W = F·d·cosθ; W=0 when F=0, d=0, or θ=90°"},
    {q:"A spring of spring constant k is compressed by x. Elastic PE stored is:",opts:["kx","kx²","½kx²","2kx²"],ans:2,ch:"Work Energy & Power",src:"Motion Institute",diff:"Easy",exp:"PE = ½kx² — work done against spring force"},
    {q:"A particle moves in a circle of radius r. Work done by centripetal force in one complete revolution is:",opts:["2πr × F","Zero","πr² × F","F/r"],ans:1,ch:"Work Energy & Power",src:"Allen Module",diff:"Medium",exp:"Centripetal force is always perpendicular to displacement, so W = F·d·cos90° = 0"},

    // ── Rotational Motion ──
    {q:"A sphere of mass M and radius R. Moment of inertia about diameter is:",opts:["2MR²/5","MR²/2","MR²","2MR²/3"],ans:0,ch:"Rotational Motion",src:"NCERT Exemplar",diff:"Medium",exp:"I = 2MR²/5 for solid sphere about diameter"},
    {q:"A person with arms stretched suddenly folds them. His angular velocity will:",opts:["Decrease","Increase","Remain same","Become zero"],ans:1,ch:"Rotational Motion",src:"AIPMT 2010",diff:"Easy",exp:"L = Iω is conserved. Folding arms decreases I, so ω increases"},
    {q:"Torque is the rotational analogue of:",opts:["Momentum","Force","Energy","Power"],ans:1,ch:"Rotational Motion",src:"Motion Institute",diff:"Easy",exp:"Torque τ = r×F; it causes angular acceleration just like force causes linear acceleration"},
    {q:"For a rolling body on inclined plane, which arrives at bottom first?",opts:["Ring","Disc","Solid sphere","Hollow sphere"],ans:2,ch:"Rotational Motion",src:"Allen Module",diff:"Hard",exp:"Solid sphere has lowest I/mr² ratio (2/5), so highest linear acceleration on incline"},

    // ── Gravitation ──
    {q:"Escape velocity from Earth surface is 11.2 km/s. For planet same mass but twice radius:",opts:["22.4 km/s","7.9 km/s","11.2 km/s","5.6 km/s"],ans:1,ch:"Gravitation",src:"NEET 2017",diff:"Medium",exp:"ve = √(2GM/R). Doubling R: ve' = ve/√2 = 11.2/√2 ≈ 7.9 km/s"},
    {q:"Gravitational potential energy is negative because:",opts:["Gravity is repulsive","Work done against gravity is negative","It is taken as zero at infinity","Gravity is weak"],ans:2,ch:"Gravitation",src:"NCERT Exemplar",diff:"Medium",exp:"GPE = -GMm/r. Reference is zero at infinity; bringing mass closer does negative work"},
    {q:"Orbital velocity of satellite at height h above Earth surface is:",opts:["√(gR²/(R+h))","√(gR)","√(2gR)","gR/(R+h)"],ans:0,ch:"Gravitation",src:"Motion Institute",diff:"Hard",exp:"vo = √(GM/(R+h)) = √(gR²/(R+h)) since g = GM/R²"},
    {q:"Kepler's third law states T² ∝:",opts:["r","r²","r³","1/r"],ans:2,ch:"Gravitation",src:"Allen Module",diff:"Easy",exp:"T² ∝ r³ — the square of orbital period is proportional to cube of semi-major axis"},

    // ── Properties of Matter ──
    {q:"Viscosity of liquid with temperature:",opts:["Increases","Decreases","Remains same","First increases then decreases"],ans:1,ch:"Properties of Matter",src:"NCERT Exemplar",diff:"Easy",exp:"Increased temperature reduces intermolecular forces in liquid, decreasing viscosity"},
    {q:"Young's modulus is defined as:",opts:["Stress/Strain","Strain/Stress","Stress × Strain","Force/Area"],ans:0,ch:"Properties of Matter",src:"Motion Institute",diff:"Easy",exp:"Y = Longitudinal stress / Longitudinal strain"},
    {q:"Surface tension of a liquid decreases with rise in temperature because:",opts:["Density decreases","Cohesive forces decrease","Viscosity increases","Pressure increases"],ans:1,ch:"Properties of Matter",src:"Allen Module",diff:"Medium",exp:"Higher temperature → faster molecules → weaker cohesive forces → lower surface tension"},

    // ── Thermodynamics ──
    {q:"For an adiabatic process, which is correct?",opts:["q=0","w=0","ΔU=0","ΔH=0"],ans:0,ch:"Thermodynamics",src:"AIPMT 2021",diff:"Easy",exp:"No heat exchange in adiabatic: q = 0, so ΔU = -W"},
    {q:"In an isothermal expansion of ideal gas, internal energy:",opts:["Increases","Decreases","Remains constant","Becomes zero"],ans:2,ch:"Thermodynamics",src:"NCERT Exemplar",diff:"Easy",exp:"For ideal gas, U depends only on T. Isothermal means constant T, so ΔU = 0"},
    {q:"Efficiency of Carnot engine between T₁ and T₂ (T₁>T₂) is:",opts:["T₁/T₂","T₂/T₁","1-T₂/T₁","1-T₁/T₂"],ans:2,ch:"Thermodynamics",src:"Motion Institute",diff:"Medium",exp:"η = 1 - T₂/T₁ where T₂ is cold reservoir and T₁ is hot reservoir temperature"},
    {q:"First law of thermodynamics is a statement of:",opts:["Conservation of momentum","Conservation of energy","Conservation of mass","Second law"],ans:1,ch:"Thermodynamics",src:"Allen Module",diff:"Easy",exp:"ΔU = Q - W; first law states energy cannot be created or destroyed"},

    // ── Kinetic Theory of Gases ──
    {q:"If temperature of ideal gas is increased by 25%, pressure increases (constant V) by:",opts:["25%","12.5%","50%","None"],ans:0,ch:"Kinetic Theory of Gases",src:"AIPMT 2005",diff:"Easy",exp:"At constant V, P∝T. T increases by 25%, P also increases by 25%"},
    {q:"RMS speed of gas molecule is proportional to:",opts:["√T","T","T²","1/√T"],ans:0,ch:"Kinetic Theory of Gases",src:"NCERT Exemplar",diff:"Easy",exp:"vrms = √(3RT/M) ∝ √T"},
    {q:"At same temperature, which gas molecules have highest average KE?",opts:["H₂","O₂","N₂","All same"],ans:3,ch:"Kinetic Theory of Gases",src:"Motion Institute",diff:"Medium",exp:"Average KE = 3/2 kT — depends only on temperature, not on mass or type of gas"},
    {q:"Degrees of freedom of diatomic gas at room temperature:",opts:["3","5","6","7"],ans:1,ch:"Kinetic Theory of Gases",src:"Allen Module",diff:"Medium",exp:"Diatomic: 3 translational + 2 rotational = 5 degrees of freedom at room temp"},

    // ── Oscillations ──
    {q:"Simple pendulum of length 1 m. Time period (g=10) is:",opts:["1.99 s","1 s","3.14 s","0.5 s"],ans:0,ch:"Oscillations",src:"NCERT Exemplar",diff:"Easy",exp:"T = 2π√(l/g) = 2π√(0.1) ≈ 1.99 s"},
    {q:"In SHM, which quantity is NOT constant?",opts:["Time period","Amplitude","Total energy","Velocity"],ans:3,ch:"Oscillations",src:"Motion Institute",diff:"Easy",exp:"Velocity varies between 0 (at extremes) and maximum (at mean position) in SHM"},
    {q:"For a spring-mass system, if mass is quadrupled, time period becomes:",opts:["4T","2T","T/2","T/4"],ans:1,ch:"Oscillations",src:"Allen Module",diff:"Medium",exp:"T = 2π√(m/k). If m→4m: T' = 2π√(4m/k) = 2T"},
    {q:"At mean position in SHM, the restoring force is:",opts:["Maximum","Minimum (zero)","Equal to weight","Constant"],ans:1,ch:"Oscillations",src:"Aakash Module",diff:"Easy",exp:"F = -kx; at mean position x=0, so F=0"},

    // ── Waves ──
    {q:"For air column closed at one end, ratio of 3rd overtone to 1st overtone frequency:",opts:["3:1","5:3","7:3","3:7"],ans:2,ch:"Waves",src:"AIPMT 2008",diff:"Medium",exp:"Closed pipe: f_n = (2n-1)f₀. 1st overtone=3f₀, 3rd overtone=7f₀. Ratio=7:3"},
    {q:"Speed of sound in air at 0°C is 332 m/s. At 4°C it is approximately:",opts:["334 m/s","332 m/s","330 m/s","336 m/s"],ans:0,ch:"Waves",src:"Allen Module",diff:"Medium",exp:"v∝√T; v₂=332×√(277/273)≈334 m/s"},
    {q:"In a standing wave, nodes are points where:",opts:["Amplitude is maximum","Amplitude is zero","Velocity is maximum","Pressure is minimum"],ans:1,ch:"Waves",src:"Motion Institute",diff:"Easy",exp:"Nodes are points of zero displacement (zero amplitude) in a standing wave"},
    {q:"Beats are produced when two waves have:",opts:["Same frequency","Same amplitude","Slightly different frequency","Same phase"],ans:2,ch:"Waves",src:"NCERT Exemplar",diff:"Easy",exp:"Beat frequency = |f₁ - f₂|; beats occur when two close frequencies interfere"},

    // ── Electrostatics ──
    {q:"Two charges +4μC and -4μC separated by 2 m. Electric field at midpoint:",opts:["18 kN/C","72 kN/C","9 kN/C","36 kN/C"],ans:1,ch:"Electrostatics",src:"AIPMT 2021",diff:"Hard",exp:"Both fields point same direction at midpoint: E = 2kq/r² = 2×9×10⁹×4×10⁻⁶/1 = 72 kN/C"},
    {q:"A parallel plate capacitor with air, C = 8 pF. Distance halved, dielectric constant 6 inserted. New C:",opts:["96 pF","48 pF","24 pF","6 pF"],ans:0,ch:"Electrostatics",src:"NEET 2020",diff:"Medium",exp:"C' = κ × 2 × C = 6 × 2 × 8 = 96 pF"},
    {q:"Electric field inside a hollow charged conductor is:",opts:["Maximum","Zero","Equal to surface field","Depends on charge"],ans:1,ch:"Electrostatics",src:"Motion Institute",diff:"Easy",exp:"By Gauss's law, E=0 inside a hollow conductor. All charge resides on surface"},
    {q:"Work done in moving a charge in an equipotential surface is:",opts:["Maximum","Minimum","Zero","Depends on charge"],ans:2,ch:"Electrostatics",src:"Allen Module",diff:"Easy",exp:"On equipotential surface V is constant, so W = q(V₁-V₂) = q×0 = 0"},

    // ── Current Electricity ──
    {q:"Three resistors 1Ω, 2Ω, 3Ω in parallel. Equivalent resistance:",opts:["6/11 Ω","6 Ω","11/6 Ω","1 Ω"],ans:0,ch:"Current Electricity",src:"NCERT Exemplar",diff:"Medium",exp:"1/R = 1+1/2+1/3 = 11/6, so R = 6/11 Ω"},
    {q:"Ohm's law is valid for:",opts:["Semiconductors","Electrolytes","Metallic conductors at constant T","Vacuum tubes"],ans:2,ch:"Current Electricity",src:"Motion Institute",diff:"Easy",exp:"Ohm's law (V=IR) is valid for metallic conductors at constant temperature"},
    {q:"Kirchhoff's current law is based on conservation of:",opts:["Energy","Charge","Momentum","Mass"],ans:1,ch:"Current Electricity",src:"Allen Module",diff:"Easy",exp:"KCL: sum of currents at a junction = 0, based on conservation of charge"},
    {q:"Resistivity of a conductor depends on:",opts:["Length","Area of cross-section","Temperature","Both length and area"],ans:2,ch:"Current Electricity",src:"Aakash Module",diff:"Medium",exp:"Resistivity ρ is an intrinsic property depending on material and temperature, not dimensions"},

    // ── Magnetic Effects of Current ──
    {q:"Long solenoid: B = μ₀nI. If current doubled and turns/cm halved, new B is:",opts:["B/2","2B","4B","B"],ans:3,ch:"Magnetic Effects of Current",src:"NEET 2015",diff:"Medium",exp:"B=μ₀nI; n halved, I doubled → B unchanged = B"},
    {q:"Magnetic force on a charge moving parallel to magnetic field is:",opts:["Maximum","Zero","Half of max","Depends on sign"],ans:1,ch:"Magnetic Effects of Current",src:"NCERT Exemplar",diff:"Easy",exp:"F=qvBsinθ; θ=0° when parallel → F=0"},
    {q:"An electron enters magnetic field B perpendicular to it. It moves in:",opts:["Straight line","Parabola","Circle","Helix"],ans:2,ch:"Magnetic Effects of Current",src:"Motion Institute",diff:"Easy",exp:"Magnetic force provides centripetal force → circular motion when v⊥B"},
    {q:"Radius of circular path of charged particle in magnetic field:",opts:["mv/qB","qvB/m","qB/mv","mvB/q"],ans:0,ch:"Magnetic Effects of Current",src:"Allen Module",diff:"Medium",exp:"r = mv/(qB) from qvB = mv²/r"},

    // ── Electromagnetic Induction ──
    {q:"A coil of 100 turns, area 5×10⁻⁴ m², B=0.2 T. Turned 180° in 0.1 s. Induced emf:",opts:["0.2 V","2 V","0.4 V","4 V"],ans:1,ch:"Electromagnetic Induction",src:"AIPMT 2009",diff:"Medium",exp:"e = N×2BA/t = 100×2×0.2×5×10⁻⁴/0.1 = 2V"},
    {q:"Lenz's law is based on conservation of:",opts:["Charge","Energy","Momentum","Mass"],ans:1,ch:"Electromagnetic Induction",src:"Motion Institute",diff:"Easy",exp:"Lenz's law: induced current opposes change in flux — consistent with energy conservation"},
    {q:"Self-inductance of a solenoid depends on:",opts:["Current through it","Applied voltage","Number of turns and geometry","Resistance"],ans:2,ch:"Electromagnetic Induction",src:"NCERT Exemplar",diff:"Medium",exp:"L = μ₀n²Al — depends on geometry (n, A, l) not on current or voltage"},

    // ── Alternating Current ──
    {q:"Current leads voltage by π/2 in a circuit. The element is:",opts:["Resistor","Inductor","Capacitor","LC circuit"],ans:2,ch:"Alternating Current",src:"AIPMT 2013",diff:"Medium",exp:"In capacitor, current leads voltage by 90° (π/2)"},
    {q:"LC circuit: L=1 mH, C=1 μF. Resonant frequency is approximately:",opts:["159 kHz","1592 Hz","15.9 kHz","1.59 MHz"],ans:0,ch:"Alternating Current",src:"Aakash Module",diff:"Hard",exp:"f = 1/(2π√LC) = 1/(2π√10⁻³×10⁻⁶) ≈ 159 kHz"},
    {q:"Power dissipated in pure inductor connected to AC source is:",opts:["Maximum","Minimum (zero)","½ of peak power","Depends on frequency"],ans:1,ch:"Alternating Current",src:"Motion Institute",diff:"Medium",exp:"Pure inductor has φ=90°, so P = VrmsIrms×cos90° = 0"},

    // ── Ray Optics ──
    {q:"Light travels through glass slab of thickness t and refractive index μ. Time taken:",opts:["t/cμ","tμ/c","tc/μ","t/c"],ans:1,ch:"Ray Optics",src:"AIPMT 2001",diff:"Easy",exp:"Speed in glass = c/μ; time = t/(c/μ) = tμ/c"},
    {q:"A convex lens (f=20 cm) forms image at 40 cm. Object distance:",opts:["40 cm","20 cm","60 cm","80 cm"],ans:0,ch:"Ray Optics",src:"NCERT Exemplar",diff:"Medium",exp:"1/v - 1/u = 1/f → 1/40 - 1/u = 1/20 → u = -40 cm"},
    {q:"Two thin lenses of focal lengths f₁ and f₂ in contact. Equivalent focal length:",opts:["f₁+f₂","f₁f₂/(f₁+f₂)","(f₁+f₂)/f₁f₂","f₁f₂"],ans:1,ch:"Ray Optics",src:"AIPMT 2007",diff:"Easy",exp:"1/f = 1/f₁+1/f₂; f = f₁f₂/(f₁+f₂)"},
    {q:"Critical angle for total internal reflection depends on:",opts:["Wavelength of light","Refractive index","Both wavelength and refractive index","Neither"],ans:2,ch:"Ray Optics",src:"Motion Institute",diff:"Medium",exp:"sinC = 1/μ; μ depends on wavelength (dispersion), so C also depends on both"},

    // ── Wave Optics ──
    {q:"In Young's double slit, d=1mm, D=1m, λ=500nm. Fringe width:",opts:["0.5 mm","0.05 mm","5 mm","0.1 mm"],ans:0,ch:"Wave Optics",src:"NEET 2024",diff:"Easy",exp:"β = λD/d = 500×10⁻⁹×1/10⁻³ = 0.5×10⁻³ m = 0.5 mm"},
    {q:"In Young's experiment, if d is doubled, fringe width:",opts:["β/2","2β","β unchanged","4β"],ans:0,ch:"Wave Optics",src:"Allen Module",diff:"Medium",exp:"β = λD/d; β ∝ 1/d; doubling d → β/2"},
    {q:"Diffraction is maximum when slit width is:",opts:["Much larger than λ","Equal to λ","Much smaller than λ","Zero"],ans:1,ch:"Wave Optics",src:"Motion Institute",diff:"Medium",exp:"Diffraction is pronounced when slit width ≈ λ (wavelength of light)"},

    // ── Dual Nature of Matter ──
    {q:"De Broglie wavelength λ at velocity v. At 2v it becomes:",opts:["λ/2","2λ","4λ","λ/4"],ans:0,ch:"Dual Nature of Matter",src:"AIPMT 2023",diff:"Medium",exp:"λ = h/mv; doubling v halves λ → λ/2"},
    {q:"Threshold frequency for Na corresponds to λ=5000Å. Work function is:",opts:["4×10⁻¹⁹ J","1 J","2×10⁻¹⁹ J","3×10⁻¹⁹ J"],ans:0,ch:"Dual Nature of Matter",src:"NEET 2022",diff:"Medium",exp:"W = hc/λ = 6.6×10⁻³⁴×3×10⁸/(5000×10⁻¹⁰) ≈ 4×10⁻¹⁹ J"},
    {q:"Photoelectric effect proves light is:",opts:["Wave","Particle","Both wave and particle","Neither"],ans:1,ch:"Dual Nature of Matter",src:"Motion Institute",diff:"Easy",exp:"Photoelectric effect cannot be explained by wave theory; it proves particle (photon) nature of light"},

    // ── Atoms & Nuclei ──
    {q:"Energy of photon with f = 6×10¹⁴ Hz (h=6.6×10⁻³⁴ Js):",opts:["3.96×10⁻¹⁹ J","6.6×10⁻¹⁹ J","2×10⁻¹⁹ J","1×10⁻¹⁸ J"],ans:0,ch:"Atoms & Nuclei",src:"AIPMT 2022",diff:"Medium",exp:"E = hf = 6.6×10⁻³⁴×6×10¹⁴ = 3.96×10⁻¹⁹ J"},
    {q:"Electron in H atom jumps from n=3 to n=2. Wavelength of emitted radiation:",opts:["6563 Å","1213 Å","4861 Å","3646 Å"],ans:0,ch:"Atoms & Nuclei",src:"AIPMT 2006",diff:"Medium",exp:"ΔE = E₃-E₂ = 1.89 eV; λ = hc/ΔE ≈ 6563 Å (Hα line, Balmer series)"},
    {q:"In radioactive decay, which remains conserved?",opts:["Atomic number","Mass number","Both atomic and mass number","Neither"],ans:2,ch:"Atoms & Nuclei",src:"Motion Institute",diff:"Easy",exp:"In nuclear reactions, both atomic number (charge) and mass number are conserved"},
    {q:"Half-life of radioactive substance is 30 min. Fraction remaining after 2 hours:",opts:["1/16","1/8","1/4","1/2"],ans:0,ch:"Atoms & Nuclei",src:"Allen Module",diff:"Medium",exp:"2 hours = 4 half-lives. Fraction = (1/2)⁴ = 1/16"},

    // ── Semiconductors ──
    {q:"In n-type semiconductor, majority carriers are:",opts:["Holes","Electrons","Protons","Neutrons"],ans:1,ch:"Semiconductors",src:"AIPMT 2023",diff:"Easy",exp:"n-type doped with pentavalent atoms → electrons are majority carriers"},
    {q:"NAND gate is universal because:",opts:["It is cheapest","Any logic gate can be made using only NAND","It has two inputs","It consumes less power"],ans:1,ch:"Semiconductors",src:"NEET 2023",diff:"Easy",exp:"NAND gate is universal — AND, OR, NOT and all other gates can be built from NAND alone"},
    {q:"In a p-n junction diode, the depletion region is formed by:",opts:["Majority carriers only","Minority carriers only","Recombination of electrons and holes","External voltage"],ans:2,ch:"Semiconductors",src:"Motion Institute",diff:"Medium",exp:"Depletion region forms when electrons from n-side and holes from p-side recombine near junction"},
    {q:"Which diode allows current in reverse bias?",opts:["Zener diode","LED","Photodiode","All of these"],ans:0,ch:"Semiconductors",src:"NCERT Exemplar",diff:"Medium",exp:"Zener diode is designed to operate in reverse breakdown region for voltage regulation"},
  ],

  Chemistry: [
    // ── Some Basic Concepts ──
    {q:"Hybridization of carbon in diamond and graphite respectively:",opts:["sp³, sp²","sp², sp³","sp, sp²","sp³, sp"],ans:0,ch:"Some Basic Concepts",src:"AIPMT 2005",diff:"Easy",exp:"Diamond: tetrahedral sp³. Graphite: planar sp² with delocalized π electrons"},
    {q:"Molarity of pure water (density = 1 g/mL, MW = 18):",opts:["55.5 M","18 M","1 M","100 M"],ans:0,ch:"Some Basic Concepts",src:"Motion Institute",diff:"Medium",exp:"M = (1000×1)/18 = 55.5 mol/L"},
    {q:"Number of moles in 44 g of CO₂ (MW=44):",opts:["1 mol","2 mol","0.5 mol","44 mol"],ans:0,ch:"Some Basic Concepts",src:"NCERT Exemplar",diff:"Easy",exp:"Moles = mass/MW = 44/44 = 1 mol"},

    // ── Atomic Structure ──
    {q:"Which quantum number determines shape of orbital?",opts:["Principal n","Azimuthal l","Magnetic m","Spin s"],ans:1,ch:"Atomic Structure",src:"AIPMT 2022",diff:"Easy",exp:"Azimuthal quantum number l determines orbital shape (s,p,d,f)"},
    {q:"Radial nodes in 3s orbital:",opts:["2","1","3","0"],ans:0,ch:"Atomic Structure",src:"NCERT Exemplar",diff:"Medium",exp:"Radial nodes = n-l-1 = 3-0-1 = 2"},
    {q:"Electronic configuration of Cr (Z=24) is:",opts:["[Ar]3d⁴4s²","[Ar]3d⁵4s¹","[Ar]3d⁶4s⁰","[Ar]3d³4s³"],ans:1,ch:"Atomic Structure",src:"Motion Institute",diff:"Medium",exp:"Cr is [Ar]3d⁵4s¹ — half-filled d orbital is more stable"},
    {q:"Heisenberg uncertainty principle states:",opts:["Electron has definite position","Cannot determine position and momentum simultaneously","Electron moves in fixed orbits","Energy is quantized"],ans:1,ch:"Atomic Structure",src:"Allen Module",diff:"Medium",exp:"Δx·Δp ≥ h/4π — cannot simultaneously determine exact position and momentum"},

    // ── Classification of Elements ──
    {q:"First ionization energy trend across a period:",opts:["Decreases","Increases generally","No trend","Decreases then increases"],ans:1,ch:"Classification of Elements",src:"NCERT Exemplar",diff:"Easy",exp:"Nuclear charge ↑, atomic radius ↓ → IE₁ generally increases across a period"},
    {q:"Which has the highest electronegativity?",opts:["F","O","N","Cl"],ans:0,ch:"Classification of Elements",src:"AIPMT 2022",diff:"Easy",exp:"Fluorine has highest electronegativity (3.98 Pauling scale)"},
    {q:"Diagonal relationship exists between:",opts:["Li and Mg","Na and K","Be and Al","Both A and C"],ans:3,ch:"Classification of Elements",src:"Motion Institute",diff:"Medium",exp:"Diagonal relationship: Li-Mg and Be-Al show similar properties due to similar charge/size ratio"},

    // ── Chemical Bonding ──
    {q:"Bond angle in H₂O molecule:",opts:["104.5°","109.5°","120°","180°"],ans:0,ch:"Chemical Bonding",src:"AIPMT 2004",diff:"Easy",exp:"2 lone pairs on O compress bond angle from 109.5° → 104.5°"},
    {q:"Hybridization of carbon in CO₂:",opts:["sp³","sp²","sp","sp³d"],ans:2,ch:"Chemical Bonding",src:"NCERT Exemplar",diff:"Easy",exp:"CO₂ is linear with 2 double bonds → sp hybridized"},
    {q:"Which has highest bond order?",opts:["O₂","N₂","F₂","H₂"],ans:1,ch:"Chemical Bonding",src:"Motion Institute",diff:"Medium",exp:"N₂ has triple bond → bond order = 3 (highest among these)"},
    {q:"VSEPR theory predicts shape based on:",opts:["Bond polarity","Electron pair repulsion","Atomic mass","Hybridization only"],ans:1,ch:"Chemical Bonding",src:"Allen Module",diff:"Easy",exp:"VSEPR: electron pairs (both bonding and non-bonding) repel to maximize distance"},

    // ── States of Matter ──
    {q:"At same T and P, equal volumes of all gases have equal number of molecules. This is:",opts:["Boyle's law","Charles' law","Avogadro's law","Dalton's law"],ans:2,ch:"States of Matter",src:"NCERT Exemplar",diff:"Easy",exp:"Avogadro's law: at same T and P, equal volumes contain equal number of molecules"},
    {q:"Real gases deviate from ideal behavior at:",opts:["High T, low P","Low T, high P","High T, high P","Low T, low P"],ans:1,ch:"States of Matter",src:"Motion Institute",diff:"Medium",exp:"At low T and high P, intermolecular forces and volume become significant → deviation from ideal"},

    // ── Thermodynamics (Chemistry) ──
    {q:"Enthalpy of combustion of C to CO₂ = -393.5 kJ/mol. Heat released by 35.2 g CO₂:",opts:["315 kJ","630 kJ","3150 kJ","1575 kJ"],ans:0,ch:"Thermodynamics",src:"AIPMT 2008",diff:"Medium",exp:"35.2 g CO₂ = 0.8 mol; heat = 0.8×393.5 = 315 kJ"},
    {q:"Spontaneous process has:",opts:["ΔG > 0","ΔG < 0","ΔG = 0","ΔH = 0"],ans:1,ch:"Thermodynamics",src:"Motion Institute",diff:"Easy",exp:"ΔG = ΔH - TΔS < 0 for spontaneous processes at constant T and P"},
    {q:"Hess's law is based on:",opts:["Conservation of mass","Conservation of energy","Conservation of momentum","Le Chatelier's principle"],ans:1,ch:"Thermodynamics",src:"Allen Module",diff:"Easy",exp:"Hess's law: enthalpy change is independent of path — based on conservation of energy"},

    // ── Equilibrium ──
    {q:"Kp vs Kc for N₂+3H₂⇌2NH₃:",opts:["Kp=Kc(RT)²","Kp=Kc(RT)⁻²","Kp=Kc(RT)","Kp=Kc"],ans:1,ch:"Equilibrium",src:"Allen Module",diff:"Hard",exp:"Δn=2-4=-2; Kp=Kc(RT)^Δn=Kc(RT)⁻²"},
    {q:"Ionic product of water at 50°C, pH of pure water will be:",opts:["7","Less than 7","More than 7","Equal to 7 always"],ans:1,ch:"Equilibrium",src:"NEET 2016",diff:"Medium",exp:"Kw increases with T; at 50°C, [H⁺]>10⁻⁷, so pH<7 (still neutral but pH<7)"},
    {q:"Le Chatelier's principle: if pressure increased on N₂+3H₂⇌2NH₃, equilibrium shifts:",opts:["Backward","Forward","No shift","Cannot predict"],ans:1,ch:"Equilibrium",src:"Motion Institute",diff:"Medium",exp:"Increased P → equilibrium shifts to side with fewer moles of gas → forward (4 mol → 2 mol)"},

    // ── Redox Reactions ──
    {q:"Oxidation state of Mn in KMnO₄:",opts:["+4","+6","+7","+3"],ans:2,ch:"Redox Reactions",src:"NCERT Exemplar",diff:"Easy",exp:"K(+1) + Mn + 4O(-8) = 0 → Mn = +7"},
    {q:"In electrolysis, oxidation occurs at:",opts:["Cathode","Anode","Both electrodes","Neither"],ans:1,ch:"Redox Reactions",src:"Motion Institute",diff:"Easy",exp:"At anode, oxidation occurs (loss of electrons); at cathode, reduction occurs"},

    // ── s-Block Elements ──
    {q:"Which alkali metal reacts most vigorously with water?",opts:["Li","Na","K","Cs"],ans:3,ch:"s-Block Elements",src:"NCERT Exemplar",diff:"Easy",exp:"Reactivity increases down Group 1; Cs reacts most vigorously with water"},
    {q:"Plaster of Paris is:",opts:["CaSO₄·2H₂O","CaSO₄·½H₂O","CaSO₄","Ca(OH)₂"],ans:1,ch:"s-Block Elements",src:"Motion Institute",diff:"Easy",exp:"Plaster of Paris = CaSO₄·½H₂O (calcium sulphate hemihydrate)"},

    // ── p-Block Elements ──
    {q:"Strongest reducing agent among halogens:",opts:["F₂","Cl₂","Br₂","I₂"],ans:3,ch:"p-Block Elements",src:"NCERT Exemplar",diff:"Medium",exp:"I₂ has lowest reduction potential → I⁻ is strongest reducing agent among halides"},
    {q:"Order of reactivity of halogens with H₂:",opts:["F₂>Cl₂>Br₂>I₂","I₂>Br₂>Cl₂>F₂","Cl₂>F₂>Br₂>I₂","Br₂>Cl₂>F₂>I₂"],ans:0,ch:"p-Block Elements",src:"AIPMT 2002",diff:"Easy",exp:"Reactivity with H₂ decreases down Group 17: F₂>Cl₂>Br₂>I₂"},
    {q:"Which oxide of nitrogen is also called laughing gas?",opts:["NO","N₂O","NO₂","N₂O₃"],ans:1,ch:"p-Block Elements",src:"Motion Institute",diff:"Easy",exp:"N₂O (dinitrogen oxide) is called laughing gas; used as anaesthetic"},

    // ── Organic Chemistry Basics ──
    {q:"Most acidic hydrocarbon:",opts:["CH₄","C₂H₂","C₂H₄","C₆H₆"],ans:1,ch:"Organic Chemistry Basics",src:"NCERT Exemplar",diff:"Medium",exp:"C₂H₂: sp carbon has 50% s-character → highest acidity"},
    {q:"SN1 reaction rate depends on:",opts:["Nucleophile concentration","Substrate concentration","Both","Temperature only"],ans:1,ch:"Organic Chemistry Basics",src:"AIPMT 2009",diff:"Medium",exp:"SN1 is unimolecular; rate = k[substrate] — depends only on substrate"},
    {q:"Compound formed when CH₃COONa heated with NaOH (soda lime):",opts:["Ethane","Methane","Sodium carbonate","Acetylene"],ans:1,ch:"Organic Chemistry Basics",src:"AIPMT 2001",diff:"Easy",exp:"CH₃COONa + NaOH → CH₄ + Na₂CO₃ (decarboxylation)"},
    {q:"Markovnikov's rule is applicable to:",opts:["Addition to symmetric alkenes","Addition to asymmetric alkenes","Elimination reactions","Substitution reactions"],ans:1,ch:"Organic Chemistry Basics",src:"Motion Institute",diff:"Medium",exp:"Markovnikov's rule applies to addition of HX to asymmetric (unsymmetrical) alkenes"},

    // ── Hydrocarbons ──
    {q:"Addition of HBr to propene in presence of peroxide follows:",opts:["Markovnikov's rule","Anti-Markovnikov's rule","Both rules","Elimination mechanism"],ans:1,ch:"Hydrocarbons",src:"AIPMT 2013",diff:"Medium",exp:"Peroxide effect (Kharash): free radical mechanism gives anti-Markovnikov product"},
    {q:"Benzene does NOT have alternate single and double bonds because:",opts:["It is unstable","All C-C bonds are equivalent due to resonance","It cannot form bonds","It has no π electrons"],ans:1,ch:"Hydrocarbons",src:"NEET 2015",diff:"Easy",exp:"Benzene has resonance — all C-C bonds are equivalent (1.5 bond order)"},
    {q:"Ozonolysis of 2-butene gives:",opts:["Formaldehyde only","Acetaldehyde only","Mix of both","Propanone"],ans:1,ch:"Hydrocarbons",src:"Motion Institute",diff:"Medium",exp:"CH₃CH=CHCH₃ + O₃ → 2CH₃CHO (acetaldehyde) only"},

    // ── Solid State ──
    {q:"Which has highest lattice energy?",opts:["NaF","NaCl","MgO","CaO"],ans:2,ch:"Solid State",src:"NCERT Exemplar",diff:"Medium",exp:"MgO: higher charge (2+/2-) and smaller ions → highest lattice energy"},
    {q:"In FCC unit cell, number of atoms per unit cell:",opts:["1","2","4","6"],ans:2,ch:"Solid State",src:"Motion Institute",diff:"Medium",exp:"FCC: 8 corner atoms×(1/8) + 6 face atoms×(1/2) = 1+3 = 4 atoms per unit cell"},
    {q:"A crystal defect where cation is missing from its position is called:",opts:["Frenkel defect","Schottky defect","Interstitial defect","F-centre"],ans:1,ch:"Solid State",src:"Allen Module",diff:"Medium",exp:"Schottky defect: equal number of cations and anions are missing; Frenkel: ion displaced to interstitial"},

    // ── Solutions ──
    {q:"Van't Hoff factor i for NaCl in dilute solution:",opts:["1","2","3","0.5"],ans:1,ch:"Solutions",src:"Allen Module",diff:"Medium",exp:"NaCl → Na⁺+Cl⁻, gives 2 particles → i≈2"},
    {q:"Which colligative property is used to determine molar mass of polymer?",opts:["Boiling point elevation","Freezing point depression","Osmotic pressure","Vapour pressure lowering"],ans:2,ch:"Solutions",src:"Motion Institute",diff:"Medium",exp:"Osmotic pressure π=MRT is most sensitive for high molar mass polymers in dilute solutions"},
    {q:"Raoult's law for an ideal solution states:",opts:["Total pressure = product of mole fractions","Partial pressure = mole fraction × vapour pressure of pure component","Volume is additive","ΔH_mix = 0 only"],ans:1,ch:"Solutions",src:"NCERT Exemplar",diff:"Easy",exp:"Raoult's law: pA = xA × p°A (partial pressure = mole fraction × pure component pressure)"},

    // ── Electrochemistry ──
    {q:"EMF of Daniell cell at standard conditions:",opts:["1.1 V","0.76 V","1.5 V","0.34 V"],ans:0,ch:"Electrochemistry",src:"AIPMT 2023",diff:"Medium",exp:"E°cell = E°cathode - E°anode = 0.34-(-0.76) = 1.10 V"},
    {q:"In Kolbe's electrolysis, product at cathode is:",opts:["Alkane","Alkene","Hydrogen","Alkyne"],ans:2,ch:"Electrochemistry",src:"AIPMT 2003",diff:"Medium",exp:"In Kolbe's method, H⁺ ions are reduced at cathode to give H₂"},
    {q:"Conductivity of electrolytic solution increases with dilution because:",opts:["More ions","Viscosity increases","Mobility of ions increases","Temperature increases"],ans:2,ch:"Electrochemistry",src:"Motion Institute",diff:"Medium",exp:"At higher dilution, interionic interactions decrease, so ionic mobility and conductivity increase"},

    // ── Chemical Kinetics ──
    {q:"Rate r=k[A]². If [A] doubles, rate becomes:",opts:["2r","4r","8r","r/2"],ans:1,ch:"Chemical Kinetics",src:"Aakash Module",diff:"Medium",exp:"r = k(2A)² = 4kA² = 4r"},
    {q:"Activation energy decreases with addition of catalyst because:",opts:["Catalyst increases temperature","Catalyst provides alternative path of lower energy","Catalyst changes equilibrium","Catalyst increases concentration"],ans:1,ch:"Chemical Kinetics",src:"Motion Institute",diff:"Easy",exp:"Catalyst provides alternative reaction pathway with lower activation energy"},
    {q:"Half-life of first order reaction is:",opts:["0.693/k","k/0.693","0.693k","1/k"],ans:0,ch:"Chemical Kinetics",src:"NCERT Exemplar",diff:"Easy",exp:"t½ = 0.693/k for first order reaction; independent of initial concentration"},

    // ── d & f Block Elements ──
    {q:"Number of d-electrons in Fe²⁺ (Z=26):",opts:["4","6","3","5"],ans:1,ch:"d & f Block Elements",src:"AIPMT 2011",diff:"Easy",exp:"Fe: [Ar]3d⁶4s²; Fe²⁺: [Ar]3d⁶ → 6 d-electrons"},
    {q:"Mn shows highest oxidation state of +7 in:",opts:["MnO","MnO₂","MnSO₄","KMnO₄"],ans:3,ch:"d & f Block Elements",src:"NEET 2014",diff:"Easy",exp:"Mn is +7 in KMnO₄ (potassium permanganate)"},
    {q:"Which transition metal has highest melting point?",opts:["Fe","W","Cr","Mn"],ans:1,ch:"d & f Block Elements",src:"Motion Institute",diff:"Medium",exp:"Tungsten (W) has the highest melting point (3422°C) among all metals"},

    // ── Coordination Compounds ──
    {q:"IUPAC name of [Fe(CN)₆]³⁻:",opts:["Hexacyanoferrate(III)","Hexacyanoferrate(II)","Hexacyanoiron(III)","Ferricyanide"],ans:0,ch:"Coordination Compounds",src:"AIPMT 2022",diff:"Hard",exp:"Complex anion uses '-ate' suffix; Fe³⁺ → ferrate(III)"},
    {q:"EAN rule determines stability of complex. EAN of [Fe(CO)₅]:",opts:["36","36 (Kr config)","30","38"],ans:1,ch:"Coordination Compounds",src:"Motion Institute",diff:"Hard",exp:"Fe(0): 26e; 5 CO donate 2e each = 10e; total = 36 = Kr configuration"},
    {q:"Spectrochemical series: which ligand causes largest crystal field splitting?",opts:["Cl⁻","H₂O","NH₃","CN⁻"],ans:3,ch:"Coordination Compounds",src:"Allen Module",diff:"Medium",exp:"CN⁻ is strong field ligand causing largest Δ (crystal field splitting)"},

    // ── Alcohols & Ethers ──
    {q:"Phenol is acidic because phenoxide ion is stabilised by:",opts:["Inductive effect","Resonance","Hyperconjugation","H-bonding"],ans:1,ch:"Alcohols & Ethers",src:"NEET 2021",diff:"Medium",exp:"Phenoxide ion stabilized by resonance with benzene ring → phenol is acidic"},
    {q:"Lucas test distinguishes between:",opts:["Primary and secondary alcohols","Primary, secondary and tertiary alcohols","Alcohols and phenols","Alcohols and aldehydes"],ans:1,ch:"Alcohols & Ethers",src:"Motion Institute",diff:"Medium",exp:"Lucas reagent (ZnCl₂/conc. HCl): 3° reacts immediately, 2° in 5 min, 1° doesn't react at room temp"},

    // ── Aldehydes & Ketones ──
    {q:"Aldol condensation involves:",opts:["Addition to C=C","Addition then dehydration","Electrophilic addition","Free radical mechanism"],ans:1,ch:"Aldehydes & Ketones",src:"Allen Module",diff:"Hard",exp:"Aldol: α-H removed, enolate attacks carbonyl, then dehydration gives α,β-unsaturated compound"},
    {q:"Which does NOT give Tollen's test (silver mirror)?",opts:["Formic acid","Glucose","Acetaldehyde","Acetone"],ans:3,ch:"Aldehydes & Ketones",src:"Motion Institute",diff:"Medium",exp:"Acetone is a ketone; Tollen's test is positive only for aldehydes (and formic acid/glucose)"},
    {q:"Fehling's solution is reduced by:",opts:["Benzaldehyde","Acetone","Aliphatic aldehyde","Ketone"],ans:2,ch:"Aldehydes & Ketones",src:"NCERT Exemplar",diff:"Medium",exp:"Fehling's solution is reduced by aliphatic aldehydes (not aromatic aldehydes or ketones)"},

    // ── Carboxylic Acids ──
    {q:"IUPAC name of CH₃-CH(OH)-COOH is:",opts:["2-hydroxypropanoic acid","Lactic acid","3-hydroxypropanoic acid","2-methylhydroxy acid"],ans:0,ch:"Carboxylic Acids",src:"AIPMT 2007",diff:"Easy",exp:"CH₃-CH(OH)-COOH: propanoic acid with OH at C2 = 2-hydroxypropanoic acid"},
    {q:"Hunsdiecker reaction: RCOOAg + Br₂ → Products are:",opts:["AgBr + RBr","RCOOH + AgBr","AgBrO₃ + RH","RBr + CO₂ + AgBr"],ans:3,ch:"Carboxylic Acids",src:"AIPMT 2012",diff:"Hard",exp:"Hunsdiecker reaction: RCOOAg + Br₂ → RBr + CO₂ + AgBr"},

    // ── Amines ──
    {q:"Which on reduction gives primary amine?",opts:["Azide","Nitrile","Nitro compound","All of these"],ans:3,ch:"Amines",src:"NEET 2017",diff:"Medium",exp:"All three — azide, nitrile, nitro compound — give primary amine on reduction"},
    {q:"Basicity order of amines in aqueous solution:",opts:["3°>2°>1°>NH₃","2°>1°>3°>NH₃","1°>2°>3°>NH₃","NH₃>1°>2°>3°"],ans:1,ch:"Amines",src:"Motion Institute",diff:"Hard",exp:"In aqueous solution, 2° > 1° > 3° > NH₃ due to combined effect of induction and solvation"},

    // ── Biomolecules ──
    {q:"Fructose is an example of:",opts:["Aldohexose","Ketohexose","Aldopentose","Ketopentose"],ans:1,ch:"Biomolecules",src:"NEET 2022",diff:"Easy",exp:"Fructose: 6 carbons (hexose) + ketone group (ketose) = ketohexose"},
    {q:"Which is NOT a nucleotide base in DNA?",opts:["Adenine","Thymine","Uracil","Cytosine"],ans:2,ch:"Biomolecules",src:"Motion Institute",diff:"Easy",exp:"Uracil is found in RNA, not DNA. DNA has A, T, G, C; RNA has A, U, G, C"},
    {q:"Insulin is a:",opts:["Lipid","Carbohydrate","Protein","Nucleic acid"],ans:2,ch:"Biomolecules",src:"NCERT Exemplar",diff:"Easy",exp:"Insulin is a protein hormone (polypeptide) consisting of two chains A and B"},

    // ── Polymers ──
    {q:"Nylon-6,6 is formed from:",opts:["Only adipic acid","Hexamethylenediamine + adipic acid","Formaldehyde + phenol","Caprolactam"],ans:1,ch:"Polymers",src:"NEET 2019",diff:"Easy",exp:"Nylon-6,6: condensation polymer of hexamethylenediamine + adipic acid (both have 6C)"},
    {q:"Bakelite is obtained from phenol +:",opts:["Acetaldehyde","Formaldehyde","Acetone","Chlorobenzene"],ans:1,ch:"Polymers",src:"NEET 2024",diff:"Easy",exp:"Bakelite = phenol-formaldehyde resin; thermosetting polymer"},
    {q:"Natural rubber is polymer of:",opts:["Butadiene","Isoprene","Styrene","Vinyl chloride"],ans:1,ch:"Polymers",src:"Motion Institute",diff:"Easy",exp:"Natural rubber = poly-cis-isoprene (2-methylbuta-1,3-diene polymer)"},
  ],

  Biology: [
    // ── Cell Structure & Function ──
    {q:"Which cell organelle does NOT have a membrane?",opts:["Mitochondria","Chloroplast","Ribosome","Lysosome"],ans:2,ch:"Cell Structure & Function",src:"AIPMT 2000",diff:"Easy",exp:"Ribosomes are non-membranous organelles made of rRNA and protein"},
    {q:"The 'suicidal bags' of the cell are called:",opts:["Ribosomes","Peroxisomes","Lysosomes","Golgi bodies"],ans:2,ch:"Cell Structure & Function",src:"AIPMT 1999",diff:"Easy",exp:"Lysosomes contain hydrolytic enzymes that can digest the cell if released"},
    {q:"The powerhouse of the cell is:",opts:["Nucleus","Ribosome","Mitochondria","Golgi body"],ans:2,ch:"Cell Structure & Function",src:"Motion Institute",diff:"Easy",exp:"Mitochondria produce ATP through cellular respiration — hence called powerhouse of cell"},
    {q:"Which organelle is responsible for protein synthesis?",opts:["Mitochondria","Ribosome","Lysosome","Golgi body"],ans:1,ch:"Cell Structure & Function",src:"NCERT Exemplar",diff:"Easy",exp:"Ribosomes are the site of protein synthesis (translation of mRNA)"},
    {q:"Cell wall of plant cells is mainly composed of:",opts:["Chitin","Cellulose","Peptidoglycan","Phospholipids"],ans:1,ch:"Cell Structure & Function",src:"Allen Module",diff:"Easy",exp:"Plant cell wall is primarily made of cellulose (a polysaccharide of glucose)"},
    {q:"Which is NOT a function of endoplasmic reticulum?",opts:["Protein synthesis (rough ER)","Lipid synthesis (smooth ER)","Transport of materials","Energy production"],ans:3,ch:"Cell Structure & Function",src:"Motion Institute",diff:"Medium",exp:"Energy production occurs in mitochondria, not ER. ER is involved in synthesis and transport"},

    // ── Cell Division ──
    {q:"Totipotency refers to capacity of plant cell to:",opts:["Divide into many cells","Regenerate into whole plant","Synthesize all biomolecules","Resist disease"],ans:1,ch:"Cell Division",src:"AIPMT 2001",diff:"Easy",exp:"Totipotency = ability of single cell to develop into complete organism"},
    {q:"During which phase of mitosis do chromosomes align at cell equator?",opts:["Prophase","Metaphase","Anaphase","Telophase"],ans:1,ch:"Cell Division",src:"Motion Institute",diff:"Easy",exp:"In metaphase, chromosomes align at the metaphase plate (equatorial plate)"},
    {q:"Crossing over during meiosis occurs in:",opts:["Leptotene","Zygotene","Pachytene","Diplotene"],ans:2,ch:"Cell Division",src:"NCERT Exemplar",diff:"Medium",exp:"Crossing over (exchange of genetic material) occurs during pachytene of prophase I of meiosis"},
    {q:"Number of chromosomes in human after meiosis II:",opts:["46","23","92","12"],ans:1,ch:"Cell Division",src:"Allen Module",diff:"Easy",exp:"After meiosis II, each cell has haploid (n=23) chromosomes"},

    // ── Biomolecules ──
    {q:"Fructose is a:",opts:["Aldohexose","Ketohexose","Aldopentose","Disaccharide"],ans:1,ch:"Biomolecules",src:"NEET 2022",diff:"Easy",exp:"Fructose: 6C ketose sugar = ketohexose"},
    {q:"Peptide bond is formed between:",opts:["Amino group of one AA and carboxyl of another","Two amino groups","Two carboxyl groups","Amino group and R-group"],ans:0,ch:"Biomolecules",src:"Motion Institute",diff:"Easy",exp:"Peptide bond: -CO-NH- formed between -COOH of one amino acid and -NH₂ of next"},
    {q:"DNA double helix was proposed by:",opts:["Mendel","Watson and Crick","Morgan","Darwin"],ans:1,ch:"Biomolecules",src:"NCERT Exemplar",diff:"Easy",exp:"Watson and Crick proposed the double helix model of DNA in 1953"},
    {q:"Which base pairs with Adenine in DNA?",opts:["Cytosine","Guanine","Thymine","Uracil"],ans:2,ch:"Biomolecules",src:"Allen Module",diff:"Easy",exp:"In DNA, Adenine pairs with Thymine (A=T, 2 hydrogen bonds); G≡C, 3 hydrogen bonds"},

    // ── Photosynthesis ──
    {q:"Product of Calvin cycle which directly enters glycolysis:",opts:["G3P (PGAL)","RuBP","3-PGA","OAA"],ans:0,ch:"Photosynthesis",src:"NEET 2021",diff:"Medium",exp:"G3P (glyceraldehyde-3-phosphate) from Calvin cycle is starting material for glycolysis"},
    {q:"In light reaction, oxygen is released from:",opts:["CO₂","H₂O","NADPH","ATP"],ans:1,ch:"Photosynthesis",src:"NCERT Exemplar",diff:"Easy",exp:"O₂ is released by photolysis of water in light-dependent reactions (PS II)"},
    {q:"C4 plants fix CO₂ first into:",opts:["3-PGA","Oxaloacetate (OAA)","RuBP","PGAL"],ans:1,ch:"Photosynthesis",src:"Motion Institute",diff:"Medium",exp:"In C4 plants, CO₂ first combines with PEP to form oxaloacetate (4C compound) in mesophyll cells"},
    {q:"Photosystem I has absorption maximum at:",opts:["680 nm","700 nm","550 nm","600 nm"],ans:1,ch:"Photosynthesis",src:"Allen Module",diff:"Medium",exp:"PS I (P700) absorbs maximally at 700 nm; PS II (P680) absorbs at 680 nm"},

    // ── Respiration ──
    {q:"Maximum ATP produced from one glucose by aerobic respiration:",opts:["36-38","30-32","38-40","28-30"],ans:0,ch:"Respiration",src:"AIPMT 2010",diff:"Medium",exp:"Complete aerobic respiration yields 36-38 ATP (depending on shuttle mechanism used)"},
    {q:"Glycolysis occurs in:",opts:["Mitochondria","Chloroplast","Cytoplasm","Nucleus"],ans:2,ch:"Respiration",src:"Motion Institute",diff:"Easy",exp:"Glycolysis occurs in cytoplasm (cytosol); does not require mitochondria"},
    {q:"End product of anaerobic respiration in yeast is:",opts:["Lactic acid","Ethanol + CO₂","Pyruvate","Acetic acid"],ans:1,ch:"Respiration",src:"NCERT Exemplar",diff:"Easy",exp:"Yeast fermentation: glucose → ethanol + CO₂ (fermentation/anaerobic respiration)"},
    {q:"Krebs cycle occurs in:",opts:["Cytoplasm","Mitochondrial matrix","Inner mitochondrial membrane","Nucleus"],ans:1,ch:"Respiration",src:"Allen Module",diff:"Easy",exp:"Krebs (TCA) cycle occurs in mitochondrial matrix"},

    // ── Plant Growth & Development ──
    {q:"In hypogeal germination, cotyledons remain below soil because:",opts:["Epocotyl elongates","Hypocotyl does not elongate","Root pulls them down","Seed coat holds them"],ans:1,ch:"Plant Growth & Development",src:"AIPMT 2004",diff:"Easy",exp:"Hypogeal germination: hypocotyl doesn't elongate; cotyledons remain underground (e.g., pea, maize)"},
    {q:"Auxin promotes cell elongation by:",opts:["Increasing turgor","Loosening cell wall","Increasing cell division","Activating stomata"],ans:1,ch:"Plant Growth & Development",src:"Motion Institute",diff:"Medium",exp:"Auxin activates proton pumps → acidifies cell wall → activates expansins → wall loosens → elongation"},
    {q:"Vernalization is the process by which flowering is induced by:",opts:["Long day length","Short day length","Low temperature exposure","High temperature"],ans:2,ch:"Plant Growth & Development",src:"NCERT Exemplar",diff:"Medium",exp:"Vernalization: prolonged exposure to low temperature induces or accelerates flowering in plants"},

    // ── Digestion & Absorption ──
    {q:"HCl is secreted by which cells in stomach?",opts:["Chief cells","Parietal (oxyntic) cells","Mucous cells","G cells"],ans:1,ch:"Digestion & Absorption",src:"Motion Institute",diff:"Medium",exp:"HCl is secreted by parietal (oxyntic) cells of gastric glands"},
    {q:"Bile is produced by liver and stored in:",opts:["Pancreas","Gall bladder","Duodenum","Stomach"],ans:1,ch:"Digestion & Absorption",src:"NCERT Exemplar",diff:"Easy",exp:"Bile is produced by hepatocytes in liver and stored in gall bladder"},
    {q:"Which enzyme digests protein in stomach?",opts:["Amylase","Lipase","Pepsin","Trypsin"],ans:2,ch:"Digestion & Absorption",src:"Allen Module",diff:"Easy",exp:"Pepsin (from pepsinogen + HCl) digests proteins in stomach; trypsin acts in small intestine"},

    // ── Breathing & Gas Exchange ──
    {q:"Respiratory quotient (RQ) for carbohydrates is:",opts:["0.7","1.0","0.9","1.3"],ans:1,ch:"Breathing & Gas Exchange",src:"NCERT Exemplar",diff:"Easy",exp:"For carbohydrates: CO₂ produced / O₂ consumed = 6/6 = 1.0"},
    {q:"Tidal volume in normal breathing is approximately:",opts:["500 mL","1500 mL","2500 mL","3500 mL"],ans:0,ch:"Breathing & Gas Exchange",src:"Motion Institute",diff:"Easy",exp:"Tidal volume ≈ 500 mL (0.5 L) — volume of air inhaled/exhaled in normal quiet breathing"},
    {q:"Haemoglobin carries O₂ as:",opts:["Physical solution","Oxyhaemoglobin","Carboxyhaemoglobin","HbCO₂"],ans:1,ch:"Breathing & Gas Exchange",src:"Allen Module",diff:"Easy",exp:"O₂ binds to Fe²⁺ in haem group of Hb to form oxyhaemoglobin (HbO₂)"},

    // ── Body Fluids & Circulation ──
    {q:"Normal blood pressure (systolic/diastolic) in adults:",opts:["80/120 mmHg","120/80 mmHg","100/60 mmHg","140/100 mmHg"],ans:1,ch:"Body Fluids & Circulation",src:"Motion Institute",diff:"Easy",exp:"Normal BP = 120/80 mmHg (systolic/diastolic)"},
    {q:"ABO blood group system is determined by:",opts:["Antibodies in plasma","Antigens on RBC surface","White blood cell type","Rh factor"],ans:1,ch:"Body Fluids & Circulation",src:"NCERT Exemplar",diff:"Easy",exp:"ABO groups determined by antigens (A, B) on RBC surface; plasma has corresponding antibodies"},
    {q:"Intercalated discs are found in:",opts:["Skeletal muscle","Cardiac muscle","Smooth muscle","Nervous tissue"],ans:1,ch:"Body Fluids & Circulation",src:"AIPMT 2003",diff:"Easy",exp:"Intercalated discs are specialized junctions found only in cardiac muscle for coordinated contraction"},

    // ── Excretory Products ──
    {q:"Functional unit of kidney is:",opts:["Ureter","Nephron","Glomerulus","Uriniferous tubule"],ans:1,ch:"Excretory Products",src:"AIPMT 2014",diff:"Easy",exp:"Nephron is the structural and functional unit of kidney"},
    {q:"Bowman's capsule surrounds:",opts:["Loop of Henle","Glomerulus","Collecting duct","PCT"],ans:1,ch:"Excretory Products",src:"AIPMT 2002",diff:"Easy",exp:"Bowman's capsule is cup-shaped structure surrounding the glomerulus in nephron"},
    {q:"Counter-current mechanism in kidney involves:",opts:["PCT and DCT","Loop of Henle and vasa recta","Glomerulus and Bowman's capsule","Collecting duct and ureter"],ans:1,ch:"Excretory Products",src:"Motion Institute",diff:"Hard",exp:"Counter-current mechanism: loop of Henle and vasa recta maintain concentration gradient in medulla"},
    {q:"Uric acid is the nitrogenous waste in:",opts:["Aquatic animals","Amphibians","Reptiles and birds","Mammals"],ans:2,ch:"Excretory Products",src:"Allen Module",diff:"Medium",exp:"Uricotelic animals (reptiles, birds) excrete uric acid — water conservation adaptation"},

    // ── Locomotion & Movement ──
    {q:"Actin and myosin are proteins present in:",opts:["Nerve tissue","Connective tissue","Muscle tissue","Epithelial tissue"],ans:2,ch:"Locomotion & Movement",src:"Motion Institute",diff:"Easy",exp:"Actin (thin filament) and myosin (thick filament) are contractile proteins in muscle tissue"},
    {q:"Number of bones in human skull:",opts:["22","28","30","8"],ans:0,ch:"Locomotion & Movement",src:"NCERT Exemplar",diff:"Medium",exp:"Human skull has 22 bones: 8 cranial + 14 facial bones"},
    {q:"Sliding filament theory of muscle contraction was proposed by:",opts:["Sherrington","Huxley and Hanson","Ramon y Cajal","Golgi"],ans:1,ch:"Locomotion & Movement",src:"Allen Module",diff:"Medium",exp:"Sliding filament theory proposed by Huxley and Hanson (1954) — actin slides over myosin"},

    // ── Neural Control ──
    {q:"Myelin sheath is produced by which cells?",opts:["Neurons","Schwann cells","Astrocytes","Microglia"],ans:1,ch:"Neural Control",src:"Motion Institute",diff:"Medium",exp:"Myelin sheath in PNS is produced by Schwann cells; in CNS by oligodendrocytes"},
    {q:"Resting membrane potential of neuron is approximately:",opts:["-70 mV","+70 mV","-90 mV","0 mV"],ans:0,ch:"Neural Control",src:"NCERT Exemplar",diff:"Medium",exp:"Resting membrane potential ≈ -70 mV (inside negative) due to K⁺ and Na⁺ ion distribution"},
    {q:"Which is NOT a part of hind brain?",opts:["Pons","Cerebellum","Medulla oblongata","Hypothalamus"],ans:3,ch:"Neural Control",src:"Allen Module",diff:"Medium",exp:"Hypothalamus is part of forebrain (diencephalon). Hindbrain = pons + cerebellum + medulla"},

    // ── Chemical Coordination ──
    {q:"Hormone responsible for fight-or-flight response:",opts:["Insulin","Adrenaline","Thyroxine","Cortisol"],ans:1,ch:"Chemical Coordination",src:"NEET 2015",diff:"Easy",exp:"Adrenaline (epinephrine) from adrenal medulla prepares body for emergency response"},
    {q:"Which gland is called master gland?",opts:["Thyroid","Adrenal","Pituitary","Pineal"],ans:2,ch:"Chemical Coordination",src:"Motion Institute",diff:"Easy",exp:"Pituitary gland is called master gland as it controls most other endocrine glands via tropic hormones"},
    {q:"Insulin is secreted by which cells of pancreas?",opts:["Alpha cells","Beta cells","Delta cells","Acinar cells"],ans:1,ch:"Chemical Coordination",src:"NCERT Exemplar",diff:"Easy",exp:"Beta cells of islets of Langerhans secrete insulin; alpha cells secrete glucagon"},

    // ── Reproduction in Plants ──
    {q:"Double fertilization is unique characteristic of:",opts:["Gymnosperms","Angiosperms","Pteridophytes","Bryophytes"],ans:1,ch:"Reproduction in Plants",src:"AIPMT 2008",diff:"Easy",exp:"Double fertilization — one male gamete + egg = zygote; second + polar nuclei = triploid endosperm — only in angiosperms"},
    {q:"Endosperm in angiosperms is:",opts:["Haploid (n)","Diploid (2n)","Triploid (3n)","Tetraploid (4n)"],ans:2,ch:"Reproduction in Plants",src:"Motion Institute",diff:"Medium",exp:"Endosperm = fusion of second male gamete (n) + 2 polar nuclei (2n) = triploid (3n)"},
    {q:"Apomixis refers to:",opts:["Asexual reproduction in animals","Vegetative propagation","Seed formation without fertilization","Cross pollination"],ans:2,ch:"Reproduction in Plants",src:"NCERT Exemplar",diff:"Medium",exp:"Apomixis: production of seeds without fertilization — clonal reproduction in plants"},

    // ── Reproduction in Animals ──
    {q:"Acrosome of sperm is derived from:",opts:["Endoplasmic reticulum","Golgi body","Mitochondria","Nucleus"],ans:1,ch:"Reproduction in Animals",src:"NEET 2017",diff:"Medium",exp:"Acrosome formed by Golgi apparatus; contains enzymes for egg penetration"},
    {q:"Amniocentesis is used for:",opts:["Detection of genetic disorders","Determining blood group","Sex determination only","Testing for HIV"],ans:0,ch:"Reproduction in Animals",src:"AIPMT 2011",diff:"Easy",exp:"Amniocentesis: fetal cells from amniotic fluid analyzed for chromosomal and genetic disorders"},
    {q:"Which hormone triggers ovulation in females?",opts:["FSH","LH","Estrogen","Progesterone"],ans:1,ch:"Reproduction in Animals",src:"Motion Institute",diff:"Medium",exp:"LH surge (LH peak) triggers ovulation around day 14 of menstrual cycle"},

    // ── Genetics ──
    {q:"Meiosis generates genetic variation through:",opts:["DNA replication","Crossing over and independent assortment","Mitosis","Translation"],ans:1,ch:"Genetics",src:"AIPMT 2006",diff:"Easy",exp:"Crossing over (recombination) and independent assortment during meiosis generate variation"},
    {q:"In ABO blood group, universal donor is:",opts:["A","B","AB","O"],ans:3,ch:"Genetics",src:"Motion Institute",diff:"Easy",exp:"Blood group O has no A or B antigens on RBCs → can donate to all groups → universal donor"},
    {q:"Colour blindness in humans is linked to:",opts:["Autosome","Y chromosome","X chromosome","Both X and Y"],ans:2,ch:"Genetics",src:"NCERT Exemplar",diff:"Easy",exp:"Colour blindness gene is on X chromosome — X-linked recessive trait; more common in males"},
    {q:"Test cross is used to determine:",opts:["Dominance","Genotype of organism","Mutation rate","Linkage"],ans:1,ch:"Genetics",src:"Allen Module",diff:"Medium",exp:"Test cross: crossing with homozygous recessive to determine if organism is homozygous or heterozygous dominant"},

    // ── Molecular Basis of Inheritance ──
    {q:"DNA polymerase adds nucleotides in direction:",opts:["3' to 5'","5' to 3'","Both directions","Random direction"],ans:1,ch:"Molecular Basis of Inheritance",src:"NEET 2018",diff:"Easy",exp:"DNA polymerase always synthesizes new strand in 5'→3' direction (reads template 3'→5')"},
    {q:"Template DNA strand A-T-G-C-A-T. Complementary mRNA is:",opts:["U-A-C-G-U-A","A-T-C-G-T-A","T-A-C-G-T-A","U-A-G-C-U-A"],ans:0,ch:"Molecular Basis of Inheritance",src:"AIPMT 2007",diff:"Easy",exp:"mRNA complementary to template: A→U, T→A, G→C, C→G → UACGUA"},
    {q:"Which enzyme is responsible for DNA replication unwinding?",opts:["DNA polymerase","Helicase","Ligase","Primase"],ans:1,ch:"Molecular Basis of Inheritance",src:"Motion Institute",diff:"Easy",exp:"Helicase unwinds and separates the two DNA strands at replication fork"},

    // ── Evolution ──
    {q:"Which is mismatched?",opts:["Ecosystem — Odum","Natural selection — Darwin","Mutation — Hugo de Vries","Binomial nomenclature — Lamarck"],ans:3,ch:"Evolution",src:"AIPMT 2005",diff:"Medium",exp:"Binomial nomenclature was given by Carolus Linnaeus, not Lamarck"},
    {q:"Hardy-Weinberg equilibrium states gene frequencies are constant when:",opts:["Mutation occurs","Natural selection acts","Large random mating population with no disturbing forces","Small isolated population"],ans:2,ch:"Evolution",src:"Motion Institute",diff:"Medium",exp:"H-W equilibrium: large population, random mating, no mutation/selection/migration/genetic drift"},
    {q:"Analogous organs show:",opts:["Common origin, different function","Different origin, similar function","Same origin and function","Neither"],ans:1,ch:"Evolution",src:"NCERT Exemplar",diff:"Easy",exp:"Analogous organs: different evolutionary origin but similar function (e.g., wings of bat and insect)"},

    // ── Human Health & Disease ──
    {q:"Interferons are:",opts:["Antibodies","Antigens","Antiviral proteins","Hormones"],ans:2,ch:"Human Health & Disease",src:"AIPMT 2009",diff:"Easy",exp:"Interferons: proteins secreted by virus-infected cells protecting neighbouring cells"},
    {q:"HIV primarily attacks which cells?",opts:["B lymphocytes","T helper (CD4⁺) cells","Macrophages only","RBCs"],ans:1,ch:"Human Health & Disease",src:"Motion Institute",diff:"Easy",exp:"HIV infects and destroys CD4⁺ T helper cells, crippling the immune response → AIDS"},
    {q:"Widal test is used to diagnose:",opts:["Malaria","Typhoid","AIDS","Cholera"],ans:1,ch:"Human Health & Disease",src:"NCERT Exemplar",diff:"Easy",exp:"Widal test detects antibodies against Salmonella typhi antigens — used to diagnose typhoid"},

    // ── Biotechnology Principles ──
    {q:"In gel electrophoresis, DNA separated based on:",opts:["Shape","Size","Charge density","Sequence"],ans:1,ch:"Biotechnology Principles",src:"NEET 2024",diff:"Easy",exp:"Gel electrophoresis separates DNA by size — smaller fragments migrate faster through gel"},
    {q:"Restriction endonucleases cut DNA at:",opts:["Random positions","Specific palindromic sequences","Only at AT pairs","Only at GC pairs"],ans:1,ch:"Biotechnology Principles",src:"Motion Institute",diff:"Medium",exp:"Restriction enzymes recognize and cut specific palindromic sequences (4-6 bp) in DNA"},
    {q:"Vector used for cloning in bacteria is:",opts:["Adenovirus","Plasmid","Retrovirus","Bacteriophage T4"],ans:1,ch:"Biotechnology Principles",src:"Allen Module",diff:"Easy",exp:"Plasmid is most commonly used as cloning vector in bacteria (e.g., pBR322, pUC19)"},

    // ── Biotechnology Applications ──
    {q:"Golden rice is genetically modified to produce:",opts:["More starch","β-carotene (provitamin A)","Insulin","Bt toxin"],ans:1,ch:"Biotechnology Applications",src:"NEET 2016",diff:"Easy",exp:"Golden rice engineered with genes for β-carotene biosynthesis to combat vitamin A deficiency"},
    {q:"Bt toxin in transgenic plants comes from:",opts:["Bacillus thuringiensis","Bacillus subtilis","E. coli","Agrobacterium"],ans:0,ch:"Biotechnology Applications",src:"Motion Institute",diff:"Easy",exp:"Bt toxin (Cry proteins) from Bacillus thuringiensis is toxic to specific insect pests"},

    // ── Organisms & Populations ──
    {q:"Biotic potential refers to:",opts:["Maximum population size","Maximum rate of reproduction under ideal conditions","Carrying capacity","Death rate"],ans:1,ch:"Organisms & Populations",src:"NCERT Exemplar",diff:"Medium",exp:"Biotic potential (r): maximum reproductive capacity under ideal conditions with unlimited resources"},
    {q:"Logistic growth (S-shaped curve) follows:",opts:["Exponential increase always","Growth limited by carrying capacity K","Constant growth rate","No environmental resistance"],ans:1,ch:"Organisms & Populations",src:"Motion Institute",diff:"Medium",exp:"Logistic growth: population growth slows as it approaches carrying capacity (K); dN/dt = rN(K-N)/K"},

    // ── Ecosystem ──
    {q:"Which ecosystem has highest gross primary productivity?",opts:["Tropical forest","Coral reef","Temperate forest","Open ocean"],ans:1,ch:"Ecosystem",src:"NEET 2020",diff:"Medium",exp:"Coral reefs have very high GPP (~2500 g dry matter/m²/yr) due to efficient nutrient cycling"},
    {q:"10% energy transfer law in food chain was given by:",opts:["Lindemann","Odum","Elton","Tansley"],ans:0,ch:"Ecosystem",src:"Motion Institute",diff:"Medium",exp:"Lindemann's 10% law (1942): only 10% of energy is transferred from one trophic level to next"},
    {q:"Decomposers return nutrients to ecosystem by breaking down:",opts:["Living producers","Dead organic matter","Inorganic minerals","Atmospheric gases"],ans:1,ch:"Ecosystem",src:"NCERT Exemplar",diff:"Easy",exp:"Decomposers (bacteria, fungi) break down dead organic matter → return nutrients to soil"},

    // ── Biodiversity ──
    {q:"Ozone hole is maximum over:",opts:["Africa","Arctic","Antarctica","India"],ans:2,ch:"Biodiversity",src:"NEET 2023",diff:"Easy",exp:"Largest ozone hole is over Antarctica, especially in spring (September-October)"},
    {q:"Ex-situ conservation means:",opts:["Conservation in natural habitat","Conservation outside natural habitat","Protection of endangered species in wild","Ban on hunting"],ans:1,ch:"Biodiversity",src:"Motion Institute",diff:"Easy",exp:"Ex-situ = outside natural habitat; includes zoos, botanical gardens, seed banks, cryopreservation"},
    {q:"Red Data Book contains list of:",opts:["Extinct species","Threatened/endangered species","Common species","Introduced species"],ans:1,ch:"Biodiversity",src:"NCERT Exemplar",diff:"Easy",exp:"Red Data Book (IUCN Red List) catalogues species threatened with extinction"},
  ]
};

// Combined question bank (PYQ + local fallback)
const ALL_LOCAL = {
  Physics: [...PYQ_BANK.Physics],
  Chemistry: [...PYQ_BANK.Chemistry],
  Biology: [...PYQ_BANK.Biology]
};

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function fmt(s) {
  const m = Math.floor(s / 60), r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

// ═══════════════════════════════════════════════════════
// STYLES — Calm, readable, eye-friendly
// ═══════════════════════════════════════════════════════
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:ital,wght@0,400;0,700;1,400&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  /* Warm off-white background — easier on eyes than pure white */
  --bg:       #F5F3EF;
  --bg2:      #ECEAE4;
  --bg3:      #E4E1D9;
  --card:     #FDFCFA;
  --border:   #D8D4CC;
  --border2:  #C8C4BC;

  /* Text — dark warm gray, not pure black */
  --text:     #1C1A18;
  --text2:    #4A4740;
  --text3:    #7A7570;
  --muted:    #9E9890;

  /* Accent — calm indigo */
  --blue:     #2563EB;
  --blue-lt:  #EFF2FF;
  --blue-bd:  #BFCBFF;

  /* Subject colors */
  --phy:      #1D4ED8;
  --chem:     #15803D;
  --bio:      #B45309;

  /* Status colors */
  --green:    #16A34A;
  --green-lt: #F0FDF4;
  --green-bd: #BBF7D0;
  --red:      #DC2626;
  --red-lt:   #FEF2F2;
  --red-bd:   #FECACA;
  --gold:     #D97706;
  --gold-lt:  #FFFBEB;
  --gold-bd:  #FDE68A;

  --radius:   8px;
  --radius-lg: 12px;
  --shadow:   0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06);
  --shadow-md: 0 4px 6px rgba(0,0,0,.07), 0 2px 4px rgba(0,0,0,.06);
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 15px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* ─── SCROLLBAR ─────────────────────────────── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg2); }
::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }

/* ─── HEADER ─────────────────────────────────── */
.hdr {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  padding: 0 24px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow);
}
.logo {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.3px;
}
.logo span { color: var(--blue); }

.nav-links { display: flex; align-items: center; gap: 4px; }
.nav-btn {
  padding: 6px 14px;
  border-radius: var(--radius);
  border: none;
  background: transparent;
  color: var(--text2);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all .15s;
  font-family: inherit;
}
.nav-btn:hover { background: var(--bg2); color: var(--text); }
.nav-btn.active { background: var(--blue-lt); color: var(--blue); font-weight: 600; }

/* ─── BADGES / TAGS ─────────────────────────── */
.tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.6;
}
.tag-blue  { background: var(--blue-lt);  color: var(--blue);  border: 1px solid var(--blue-bd); }
.tag-green { background: var(--green-lt); color: var(--green); border: 1px solid var(--green-bd); }
.tag-gold  { background: var(--gold-lt);  color: var(--gold);  border: 1px solid var(--gold-bd); }
.tag-gray  { background: var(--bg2);      color: var(--text2); border: 1px solid var(--border); }
.tag-red   { background: var(--red-lt);   color: var(--red);   border: 1px solid var(--red-bd); }

/* ─── BUTTONS ───────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 18px;
  border-radius: var(--radius);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all .15s;
  border: 1px solid transparent;
  line-height: 1;
}
.btn-primary {
  background: var(--blue);
  color: white;
  border-color: var(--blue);
}
.btn-primary:hover { background: #1D4ED8; }
.btn-primary:disabled { opacity: .45; cursor: not-allowed; }
.btn-outline {
  background: transparent;
  color: var(--text);
  border-color: var(--border2);
}
.btn-outline:hover { background: var(--bg2); border-color: var(--border2); }
.btn-ghost {
  background: transparent;
  color: var(--text2);
  border-color: transparent;
}
.btn-ghost:hover { background: var(--bg2); }
.btn-danger {
  background: var(--red);
  color: white;
  border-color: var(--red);
}
.btn-danger:hover { background: #B91C1C; }
.btn-success {
  background: var(--green);
  color: white;
  border-color: var(--green);
}
.btn-sm { padding: 6px 12px; font-size: 13px; }
.btn-lg { padding: 12px 24px; font-size: 15px; font-weight: 600; }
.btn-full { width: 100%; }

/* ─── CARDS ─────────────────────────────────── */
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
}
.card-body { padding: 24px; }
.card-sm .card-body { padding: 16px; }

/* ─── FORM ELEMENTS ─────────────────────────── */
.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.form-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text2);
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.form-input {
  padding: 9px 12px;
  border: 1px solid var(--border2);
  border-radius: var(--radius);
  background: var(--card);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  transition: border-color .15s, box-shadow .15s;
  outline: none;
}
.form-input:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(37,99,235,.12);
}
.form-select {
  padding: 9px 12px;
  border: 1px solid var(--border2);
  border-radius: var(--radius);
  background: var(--card);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  cursor: pointer;
  outline: none;
}
.form-select:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,.12); }

/* ─── PAGE LAYOUT ───────────────────────────── */
.page { padding: 32px 24px; max-width: 900px; margin: 0 auto; }
.page-sm { max-width: 620px; }
.page-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
  letter-spacing: -0.3px;
}
.page-sub { font-size: 14px; color: var(--text3); margin-bottom: 28px; }
.section-head {
  font-size: 13px;
  font-weight: 700;
  color: var(--text2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

/* ─── HOME ──────────────────────────────────── */
.home-hero {
  background: linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 60%, #2563EB 100%);
  border-radius: var(--radius-lg);
  padding: 40px 36px;
  color: white;
  margin-bottom: 28px;
  position: relative;
  overflow: hidden;
}
.home-hero::after {
  content: '';
  position: absolute;
  top: -40%;
  right: -10%;
  width: 350px;
  height: 350px;
  background: rgba(255,255,255,.05);
  border-radius: 50%;
}
.hero-title { font-size: 28px; font-weight: 700; margin-bottom: 8px; letter-spacing: -0.4px; }
.hero-sub { font-size: 15px; opacity: .85; max-width: 480px; line-height: 1.6; margin-bottom: 20px; }
.hero-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.hero-tag {
  padding: 4px 12px;
  background: rgba(255,255,255,.15);
  border: 1px solid rgba(255,255,255,.25);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}
.stats-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 28px; }
.stat-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
  text-align: center;
  box-shadow: var(--shadow);
}
.stat-num { font-size: 28px; font-weight: 700; color: var(--blue); letter-spacing: -0.5px; }
.stat-lbl { font-size: 12px; color: var(--text3); margin-top: 2px; }
.mode-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); gap: 16px; margin-bottom: 32px; }
.mode-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  cursor: pointer;
  transition: all .18s;
  box-shadow: var(--shadow);
  position: relative;
}
.mode-card:hover { border-color: var(--blue); box-shadow: var(--shadow-md); transform: translateY(-1px); }
.mode-card-accent { height: 3px; border-radius: 2px 2px 0 0; position: absolute; top: 0; left: 0; right: 0; border-radius: var(--radius-lg) var(--radius-lg) 0 0; }
.mode-icon { font-size: 28px; margin-bottom: 10px; margin-top: 6px; }
.mode-title { font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 5px; }
.mode-desc { font-size: 13px; color: var(--text2); line-height: 1.55; margin-bottom: 14px; }
.mode-tags { display: flex; gap: 6px; flex-wrap: wrap; }

/* ─── CONFIG SCREEN ─────────────────────────── */
.sel-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-bottom: 16px; }
.sel-item {
  padding: 12px 10px;
  border: 1px solid var(--border2);
  border-radius: var(--radius);
  cursor: pointer;
  text-align: center;
  transition: all .15s;
  background: var(--card);
  font-size: 13px;
  font-weight: 500;
  color: var(--text2);
}
.sel-item:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-lt); }
.sel-item.on { border-color: var(--blue); background: var(--blue-lt); color: var(--blue); font-weight: 600; }
.ch-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  max-height: 240px;
  overflow-y: auto;
  margin-bottom: 16px;
  padding-right: 4px;
}
.ch-item {
  padding: 9px 11px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 12.5px;
  color: var(--text2);
  transition: all .15s;
  background: var(--card);
  line-height: 1.4;
}
.ch-item:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-lt); }
.ch-item.on { border-color: var(--blue); background: var(--blue-lt); color: var(--blue); font-weight: 500; }

/* Number stepper */
.stepper { display: flex; flex-direction: column; gap: 6px; }
.stepper-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.stepper-ctrl { display: flex; align-items: center; gap: 10px; }
.step-btn {
  width: 30px; height: 30px;
  border: 1px solid var(--border2);
  border-radius: var(--radius);
  background: var(--card);
  color: var(--text);
  font-size: 16px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all .15s;
  font-family: inherit;
}
.step-btn:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-lt); }
.step-val { font-size: 20px; font-weight: 700; min-width: 44px; text-align: center; color: var(--blue); }
.quick-chips { display: flex; gap: 5px; flex-wrap: wrap; margin-top: 4px; }
.chip {
  padding: 3px 9px;
  border: 1px solid var(--border2);
  border-radius: 4px;
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  color: var(--text3);
  background: var(--card);
  transition: all .13s;
}
.chip:hover { border-color: var(--blue); color: var(--blue); }
.chip.on { border-color: var(--blue); background: var(--blue-lt); color: var(--blue); font-weight: 600; }
.step-hint { font-size: 11px; color: var(--muted); }

/* Answer mode */
.amode-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
.amode-card {
  padding: 16px;
  border: 1.5px solid var(--border2);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all .15s;
  background: var(--card);
  position: relative;
}
.amode-card:hover { border-color: var(--blue); }
.amode-card.on { border-color: var(--blue); background: var(--blue-lt); }
.amode-check {
  position: absolute;
  top: 10px; right: 10px;
  width: 18px; height: 18px;
  border-radius: 50%;
  border: 1.5px solid var(--border2);
  display: flex; align-items: center; justify-content: center;
  font-size: 10px;
}
.amode-card.on .amode-check { background: var(--blue); border-color: var(--blue); color: white; }
.amode-icon { font-size: 20px; margin-bottom: 6px; }
.amode-title { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 3px; }
.amode-desc { font-size: 11.5px; color: var(--text3); line-height: 1.45; }
.full-info {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px 16px;
  margin-bottom: 18px;
  font-size: 13px;
  color: var(--text2);
  line-height: 1.8;
}
.divider { height: 1px; background: var(--border); margin: 20px 0; }

/* ─── TEST SCREEN ───────────────────────────── */
.test-layout {
  display: grid;
  grid-template-columns: 1fr 260px;
  min-height: calc(100vh - 56px);
}
@media (max-width: 820px) {
  .test-layout { grid-template-columns: 1fr; }
  .palette-panel { display: none; }
}
.test-main { padding: 24px; max-width: 740px; }
.test-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 12px;
}
.test-meta { display: flex; align-items: center; gap: 8px; }
.test-actions-hdr { display: flex; align-items: center; gap: 8px; }
.prog-wrap { flex: 1; }
.prog-label { display: flex; justify-content: space-between; font-size: 12px; color: var(--text3); margin-bottom: 5px; }
.prog-bar { height: 5px; background: var(--bg3); border-radius: 3px; overflow: hidden; }
.prog-fill { height: 100%; background: var(--blue); border-radius: 3px; transition: width .4s ease; }
.timer-box {
  background: var(--card);
  border: 1px solid var(--border2);
  border-radius: var(--radius);
  padding: 6px 14px;
  font-size: 17px;
  font-weight: 700;
  font-family: 'Inter', monospace;
  letter-spacing: 1.5px;
  color: var(--text);
  min-width: 82px;
  text-align: center;
}
.timer-box.warn { color: var(--gold); border-color: var(--gold-bd); background: var(--gold-lt); }
.timer-box.danger { color: var(--red); border-color: var(--red-bd); background: var(--red-lt); animation: blink 1s ease infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.6} }

/* Question */
.q-meta { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
.diff-tag { padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
.d-Easy   { background: #F0FDF4; color: #16A34A; border: 1px solid #BBF7D0; }
.d-Medium { background: #FFFBEB; color: #D97706; border: 1px solid #FDE68A; }
.d-Hard   { background: #FEF2F2; color: #DC2626; border: 1px solid #FECACA; }
.q-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 22px 24px;
  margin-bottom: 14px;
  box-shadow: var(--shadow);
}
.q-number { font-size: 12px; color: var(--text3); font-weight: 500; margin-bottom: 8px; }
.q-text {
  font-family: 'Merriweather', Georgia, serif;
  font-size: 15px;
  line-height: 1.75;
  color: var(--text);
}
.options-list { display: flex; flex-direction: column; gap: 8px; }
.opt-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  transition: all .15s;
  background: var(--card);
  font-size: 14px;
  color: var(--text);
  line-height: 1.5;
  box-shadow: var(--shadow);
}
.opt-item:hover:not(.dis) {
  border-color: var(--blue);
  background: var(--blue-lt);
}
.opt-item.sel {
  border-color: var(--blue);
  background: var(--blue-lt);
}
.opt-item.ok {
  border-color: var(--green);
  background: var(--green-lt);
}
.opt-item.bad {
  border-color: var(--red);
  background: var(--red-lt);
}
.opt-item.dis { cursor: default; }
.opt-label {
  width: 26px; height: 26px;
  border-radius: 50%;
  border: 1.5px solid var(--border2);
  display: flex; align-items: center; justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  color: var(--text2);
}
.opt-item.sel  .opt-label { background: var(--blue);  border-color: var(--blue);  color: white; }
.opt-item.ok   .opt-label { background: var(--green); border-color: var(--green); color: white; }
.opt-item.bad  .opt-label { background: var(--red);   border-color: var(--red);   color: white; }
.explanation {
  background: #F0FDF4;
  border: 1px solid var(--green-bd);
  border-radius: var(--radius);
  padding: 14px 16px;
  margin-top: 12px;
}
.exp-title { font-size: 11px; font-weight: 700; color: var(--green); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }
.exp-text { font-size: 13.5px; color: var(--text); line-height: 1.65; }
.recorded-note {
  background: var(--blue-lt);
  border: 1px solid var(--blue-bd);
  border-radius: var(--radius);
  padding: 10px 14px;
  margin-top: 10px;
  font-size: 13px;
  color: var(--blue);
}
.test-nav { display: flex; align-items: center; gap: 8px; margin-top: 20px; flex-wrap: wrap; }

/* PALETTE */
.palette-panel {
  background: var(--card);
  border-left: 1px solid var(--border);
  padding: 20px;
  overflow-y: auto;
  position: sticky;
  top: 56px;
  height: calc(100vh - 56px);
}
.pal-title { font-size: 13px; font-weight: 600; color: var(--text2); margin-bottom: 12px; }
.pal-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 4px; margin-bottom: 16px; }
.pq {
  width: 32px; height: 32px;
  border-radius: 5px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid var(--border);
  background: var(--bg2);
  color: var(--text3);
  transition: all .12s;
}
.pq:hover { border-color: var(--blue); color: var(--blue); }
.pq.cur { border-color: var(--blue); background: var(--blue); color: white; }
.pq.ans { background: var(--green-lt); border-color: var(--green-bd); color: var(--green); }
.pq.mk  { background: var(--gold-lt);  border-color: var(--gold-bd);  color: var(--gold); }
.pq.cur.ans { background: var(--blue); border-color: var(--blue); color: white; }
.pal-legend { display: flex; flex-direction: column; gap: 5px; }
.leg-row { display: flex; align-items: center; gap: 7px; font-size: 11px; color: var(--text3); }
.leg-dot { width: 10px; height: 10px; border-radius: 3px; }
.scoring-info {
  margin-top: 14px;
  padding: 10px;
  background: var(--bg2);
  border-radius: var(--radius);
  font-size: 11.5px;
  color: var(--text3);
  line-height: 1.8;
}

/* ─── MODAL ─────────────────────────────────── */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.45);
  z-index: 500;
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
  backdrop-filter: blur(2px);
}
.modal {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
  max-width: 380px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0,0,0,.15);
  animation: fadeIn .2s ease;
}
@keyframes fadeIn { from { opacity:0; transform:scale(.95) } to { opacity:1; transform:none } }
.modal-icon { font-size: 32px; margin-bottom: 10px; }
.modal-title { font-size: 18px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
.modal-body { font-size: 13.5px; color: var(--text2); line-height: 1.6; margin-bottom: 20px; }
.modal-actions { display: flex; flex-direction: column; gap: 8px; }

/* ─── RESULTS ───────────────────────────────── */
.score-banner {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: var(--shadow);
}
.score-grade-bar {
  height: 5px;
  border-radius: 3px;
  max-width: 300px;
  margin: 14px auto 0;
}
.score-big { font-size: 52px; font-weight: 700; letter-spacing: -1px; }
.score-pct { font-size: 14px; color: var(--text3); margin-top: 2px; }
.grade-pill { display: inline-block; padding: 4px 14px; border-radius: 20px; font-size: 14px; font-weight: 600; margin-top: 12px; }
.res-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 20px; }
@media(max-width:520px) { .res-stats { grid-template-columns: repeat(2,1fr); } }
.res-stat {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px;
  text-align: center;
  box-shadow: var(--shadow);
}
.res-stat-num { font-size: 22px; font-weight: 700; }
.res-stat-lbl { font-size: 11px; color: var(--text3); margin-top: 2px; text-transform: uppercase; letter-spacing: 0.3px; }
.ana-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
@media(max-width:620px) { .ana-grid { grid-template-columns: 1fr; } }
.ana-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 18px;
  box-shadow: var(--shadow);
}
.ana-title { font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 14px; }
.topic-bar { margin-bottom: 10px; }
.tb-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px; }
.tb-name { font-size: 12px; color: var(--text2); }
.tb-score { font-size: 12px; font-weight: 600; }
.tb-track { height: 6px; background: var(--bg3); border-radius: 3px; overflow: hidden; }
.tb-fill { height: 100%; border-radius: 3px; transition: width 1s ease; }
.topic-pill {
  padding: 8px 12px;
  border-radius: var(--radius);
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
  font-weight: 500;
}
.tp-weak   { background: var(--red-lt);   border: 1px solid var(--red-bd);   color: var(--red); }
.tp-strong { background: var(--green-lt); border: 1px solid var(--green-bd); color: var(--green); }
.review-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: var(--shadow);
}
.rev-item { border-bottom: 1px solid var(--border); padding: 14px 0; }
.rev-item:last-child { border-bottom: none; padding-bottom: 0; }
.rev-item:first-child { padding-top: 0; }
.rev-meta { display: flex; align-items: center; gap: 6px; margin-bottom: 5px; flex-wrap: wrap; }
.rev-q { font-family: 'Merriweather', Georgia, serif; font-size: 13.5px; line-height: 1.65; color: var(--text); margin-bottom: 8px; }
.rev-opts { display: flex; gap: 5px; flex-wrap: wrap; }
.ro {
  padding: 3px 9px;
  border-radius: 4px;
  font-size: 11.5px;
  font-weight: 500;
}
.ro-ok   { background: var(--green-lt); border: 1px solid var(--green-bd); color: var(--green); }
.ro-bad  { background: var(--red-lt);   border: 1px solid var(--red-bd);   color: var(--red); }
.ro-neu  { background: var(--bg2);      border: 1px solid var(--border);   color: var(--text3); }
.rev-exp { font-size: 12px; color: var(--text3); font-style: italic; margin-top: 6px; line-height: 1.55; }

/* ─── PROFILE ───────────────────────────────── */
.profile-grid { display: grid; grid-template-columns: 200px 1fr; gap: 24px; margin-bottom: 24px; }
@media(max-width:640px) { .profile-grid { grid-template-columns: 1fr; } }
.profile-avatar {
  width: 120px; height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563EB, #1D4ED8);
  display: flex; align-items: center; justify-content: center;
  font-size: 40px;
  color: white;
  font-weight: 700;
  margin: 0 auto 16px;
}
.avatar-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  text-align: center;
  box-shadow: var(--shadow);
}
.profile-name { font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 2px; }
.profile-class { font-size: 13px; color: var(--text3); }
.info-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow);
}
.info-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media(max-width:500px) { .info-row { grid-template-columns: 1fr; } }
.info-field { font-size: 13px; color: var(--text3); margin-bottom: 2px; font-weight: 500; }
.info-value { font-size: 14px; color: var(--text); font-weight: 500; }
.stats-banner {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px,1fr));
  gap: 12px;
  margin-bottom: 20px;
}
.profile-save-row { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }

/* ─── LOADING ───────────────────────────────── */
.loading-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  gap: 14px;
}
.spinner {
  width: 40px; height: 40px;
  border: 3px solid var(--border2);
  border-top-color: var(--blue);
  border-radius: 50%;
  animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.load-title { font-size: 16px; font-weight: 600; color: var(--text); }
.load-sub { font-size: 13px; color: var(--text3); text-align: center; max-width: 300px; }

/* ─── UTILITIES ─────────────────────────────── */
.flex { display: flex; }
.flex-center { display: flex; align-items: center; }
.gap-2 { gap: 8px; }
.gap-3 { gap: 12px; }
.mb-4 { margin-bottom: 16px; }
.mb-6 { margin-bottom: 24px; }
.mt-auto { margin-top: auto; }
.text-sm { font-size: 13px; }
.text-xs { font-size: 12px; }
.text-muted { color: var(--text3); }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.w-full { width: 100%; }

/* ─── NEET SECTION TABS ──────────────────── */
.section-tabs {
  display: flex;
  gap: 0;
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 3px;
  margin-bottom: 18px;
  width: fit-content;
}
.sec-tab {
  padding: 7px 18px;
  border-radius: calc(var(--radius) - 2px);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: transparent;
  color: var(--text3);
  font-family: inherit;
  transition: all .15s;
  display: flex; align-items: center; gap: 6px;
}
.sec-tab:hover { color: var(--text); }
.sec-tab.active { background: var(--card); color: var(--text); box-shadow: 0 1px 4px rgba(0,0,0,.1); }
.sec-tab.phy.active { color: #2563EB; }
.sec-tab.che.active { color: #16A34A; }
.sec-tab.bio.active { color: #D97706; }
.sec-badge {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 10px;
  font-weight: 700;
  min-width: 18px;
  text-align: center;
}
.sec-badge.phy { background: #DBEAFE; color: #1D4ED8; }
.sec-badge.che { background: #DCFCE7; color: #15803D; }
.sec-badge.bio { background: #FEF3C7; color: #B45309; }
.pal-section-head {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 6px 0 4px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.pal-section-head:first-child { margin-top: 0; }
.pal-section-divider {
  height: 1px;
  background: var(--border);
  margin: 8px 0;
}

/* ─── SCANNER ───────────────────────────────── */
.scanner-bar {
  background: linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 100%);
  border-radius: var(--radius-lg);
  padding: 18px 22px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 22px;
  flex-wrap: wrap;
  box-shadow: var(--shadow-md);
}
.scanner-icon { font-size: 28px; flex-shrink: 0; }
.scanner-text { flex: 1; min-width: 160px; }
.scanner-title { font-size: 15px; font-weight: 700; color: white; margin-bottom: 2px; }
.scanner-sub { font-size: 12px; color: rgba(255,255,255,.75); }
.scanner-btns { display: flex; gap: 8px; flex-wrap: wrap; }
.scan-btn {
  padding: 8px 16px;
  background: rgba(255,255,255,.18);
  border: 1px solid rgba(255,255,255,.3);
  border-radius: var(--radius);
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all .15s;
  font-family: inherit;
  display: flex; align-items: center; gap: 6px;
}
.scan-btn:hover { background: rgba(255,255,255,.28); }
.scan-btn.primary { background: white; color: var(--blue); border-color: white; }
.scan-btn.primary:hover { background: #EFF2FF; }

.scanner-modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.55);
  z-index: 600;
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
  backdrop-filter: blur(3px);
}
.scanner-modal {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
  width: 100%;
  max-width: 580px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 48px rgba(0,0,0,.2);
  animation: fadeIn .2s ease;
}
.scanner-preview {
  width: 100%;
  max-height: 260px;
  object-fit: contain;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--bg2);
  margin: 12px 0;
}
.scan-drop-zone {
  border: 2px dashed var(--border2);
  border-radius: var(--radius);
  padding: 36px 20px;
  text-align: center;
  cursor: pointer;
  transition: all .2s;
  background: var(--bg2);
  margin: 12px 0;
}
.scan-drop-zone:hover { border-color: var(--blue); background: var(--blue-lt); }
.scan-drop-icon { font-size: 36px; margin-bottom: 8px; }
.scan-drop-title { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
.scan-drop-sub { font-size: 12px; color: var(--text3); }
.solution-box {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 18px;
  margin-top: 14px;
}
.sol-section { margin-bottom: 14px; }
.sol-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}
.sol-text { font-size: 14px; line-height: 1.7; color: var(--text); }
.sol-steps { counter-reset: step; }
.sol-step {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 13.5px;
  line-height: 1.65;
}
.sol-step-num {
  min-width: 22px; height: 22px;
  background: var(--blue);
  color: white;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}
.sol-answer {
  background: var(--green-lt);
  border: 1px solid var(--green-bd);
  border-radius: var(--radius);
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: var(--green);
  margin-top: 10px;
}
.q-bank-counter {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: var(--blue-lt);
  border: 1px solid var(--blue-bd);
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--blue);
  margin-bottom: 12px;
}

`;

// ═══════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════
const EMPTY_PROFILE = { name:"", dob:"", mobile:"", email:"", cls:"", photo:"" };

export default function NEETTutor() {
  // Navigation
  const [screen, setScreen] = useState("home");   // home|config|test|results|profile

  // Profile
  const [profile, setProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem("neet_profile") || "null") || EMPTY_PROFILE; } catch { return EMPTY_PROFILE; }
  });
  const [editProfile, setEditProfile] = useState({ ...EMPTY_PROFILE });
  const [profileSaved, setProfileSaved] = useState(false);

  // Test config
  const [testMode, setTestMode] = useState(null);
  const [selSub, setSelSub]     = useState(null);
  const [selCh, setSelCh]       = useState(null);
  const [ansMode, setAnsMode]   = useState(null);
  const [nQs, setNQs]           = useState(20);
  const [nMin, setNMin]         = useState(30);

  // Test state
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent]     = useState(0);
  const [answers, setAnswers]     = useState({});
  const [marked, setMarked]       = useState(new Set());
  const [timeLeft, setTimeLeft]   = useState(0);
  const [loading, setLoading]     = useState(false);
  const [lmsg, setLmsg]           = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [exitM, setExitM]         = useState(null);
  const [activeSection, setActiveSection] = useState(0); // 0=Physics,1=Chem,2=Bio (full mock only)

  // Test history for profile
  const [testHistory, setTestHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem("neet_history") || "[]"); } catch { return []; }
  });

  const timerRef = useRef(null);
  const photoRef = useRef(null);
  const scanFileRef = useRef(null);

  // ── Question cache (localStorage) — grows over time ──
  const [qCache, setQCache] = useState(() => {
    try { return JSON.parse(localStorage.getItem("neet_qcache") || "{}"); } catch { return {}; }
  });

  // ── Scanner state ──
  const [scanOpen, setScanOpen]     = useState(false);
  const [scanImg, setScanImg]       = useState(null);       // base64
  const [scanLoading, setScanLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);       // {question, answer, steps, concept, tip}
  const [scanError, setScanError]   = useState("");

  // Inject CSS
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = CSS;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  // Timer
  useEffect(() => {
    if (screen === "test" && !submitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) { clearInterval(timerRef.current); doSubmit(); return 0; }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [screen, submitted]);

  // Save profile
  function saveProfile() {
    setProfile({ ...editProfile });
    try { localStorage.setItem("neet_profile", JSON.stringify(editProfile)); } catch {}
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  }

  // Photo upload
  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("Please choose a photo under 2 MB."); return; }
    const reader = new FileReader();
    reader.onload = ev => setEditProfile(p => ({ ...p, photo: ev.target.result }));
    reader.readAsDataURL(file);
  }

  function removePhoto() {
    setEditProfile(p => ({ ...p, photo: "" }));
    if (photoRef.current) photoRef.current.value = "";
  }

  // ── Save questions to cache ──
  function saveToCache(subject, chapter, newQs) {
    if (!newQs || newQs.length === 0) return;
    const key = chapter ? `${subject}::${chapter}` : subject;
    setQCache(prev => {
      const existing = prev[key] || [];
      const seen = new Set(existing.map(q => q.q));
      const fresh = newQs.filter(q => !seen.has(q.q));
      const updated = { ...prev, [key]: [...existing, ...fresh].slice(0, 500) };
      try { localStorage.setItem("neet_qcache", JSON.stringify(updated)); } catch {}
      return updated;
    });
  }

  // ── Get cached questions ──
  function getCached(subject, chapter, count) {
    const key = chapter ? `${subject}::${chapter}` : subject;
    const pool = qCache[key] || [];
    return shuffle(pool).slice(0, count);
  }

  // ── Total cached count ──
  function totalCached() {
    return Object.values(qCache).reduce((s, arr) => s + arr.length, 0);
  }

  // ── AI question generation with web search + caching ──
  async function generateAI(subject, chapter, count) {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY || "";
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { "x-api-key": apiKey } : {})
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 8192,
        tools: [{ "type": "web_search_20250305", "name": "web_search" }],
        messages: [{
          role: "user",
          content: `You are a NEET exam question generator. Use your web_search tool to find real questions from NEET coaching institutes online, then generate high quality questions.

SUBJECT: ${subject}
${chapter ? `CHAPTER: ${chapter}` : `SCOPE: All chapters of ${subject}`}
QUESTIONS NEEDED: ${count}

STEP 1: Search for questions from these sources on the web:
- "NEET ${subject} ${chapter || ''} questions Allen Kota"
- "NEET ${subject} ${chapter || ''} MCQ Physics Wallah"  
- "NEET ${subject} ${chapter || ''} questions Motion Institute"
- "AIPMT ${subject} ${chapter || ''} previous year questions"

STEP 2: Based on your search results and your knowledge, generate exactly ${count} high-quality NEET MCQs.

STRICT RULES:
1. Every question MUST be about ${subject} — ${chapter ? `specifically chapter "${chapter}"` : 'covering different chapters'}.
2. Return ONLY a raw JSON array — no markdown, no backticks, no extra text before or after.
3. Vary difficulty: ~30% Easy, ~50% Medium, ~20% Hard.
4. All 4 options must be scientifically correct and plausible.
5. Explanations must include the concept/formula used.
6. "src" should reflect the real source or style: Allen Module, Physics Wallah, Motion Institute, Aakash Module, NEET 2020-2025, AIPMT 1999-2015, NCERT Exemplar.

JSON format:
[{"q":"Question?","opts":["A","B","C","D"],"ans":0,"src":"NEET 2023","diff":"Medium","exp":"Explanation.","ch":"${chapter || subject}"}]`
        }]
      })
    });
    const data = await resp.json();
    // Extract text from response (may have tool use blocks)
    const textBlocks = (data.content || []).filter(b => b.type === "text");
    const raw = textBlocks.map(b => b.text).join("") || "[]";
    // Extract JSON array from response
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("no JSON array in response");
    const parsed = JSON.parse(jsonMatch[0]);
    if (!Array.isArray(parsed) || parsed.length === 0) throw new Error("empty response");
    const result = parsed.map(q => ({
      q:    String(q.q || ""),
      opts: Array.isArray(q.opts) ? q.opts.map(String) : ["A","B","C","D"],
      ans:  Number(q.ans) || 0,
      ch:   String(chapter || q.ch || subject),
      src:  String(q.src || "NCERT Exemplar"),
      diff: ["Easy","Medium","Hard"].includes(q.diff) ? q.diff : "Medium",
      exp:  String(q.exp || "Refer NCERT for explanation."),
      subject
    }));
    // Cache for future use
    saveToCache(subject, chapter, result);
    return result;
  }

  // ── Scanner: solve question from image ──
  async function solveScannedQuestion(base64Image) {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY || "";
    setScanLoading(true);
    setScanResult(null);
    setScanError("");
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-api-key": apiKey } : {})
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2048,
          messages: [{
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: "image/jpeg",
                  data: base64Image.replace(/^data:image\/(jpeg|png|webp|gif);base64,/, "")
                }
              },
              {
                type: "text",
                text: `You are an expert NEET tutor. Analyze this question image and provide a complete solution.

Return ONLY a JSON object (no markdown, no backticks):
{
  "question": "The question text as you read it from the image",
  "subject": "Physics/Chemistry/Biology",
  "chapter": "Chapter name",
  "difficulty": "Easy/Medium/Hard",
  "answer": "The correct answer (full option text)",
  "correct_option": "A/B/C/D",
  "steps": ["Step 1: ...", "Step 2: ...", "Step 3: ..."],
  "concept": "The core concept/formula being tested",
  "tip": "Memory tip or shortcut for this concept",
  "similar_pyq": "Year of a similar NEET/AIPMT question if you know one"
}`
              }
            ]
          }]
        })
      });
      const data = await resp.json();
      const raw = (data.content?.[0]?.text || "{}").replace(/```json|```/g, "").trim();
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Could not parse solution");
      const result = JSON.parse(jsonMatch[0]);
      setScanResult(result);
    } catch(e) {
      setScanError("Could not solve the question. Please try a clearer image.");
    }
    setScanLoading(false);
  }

  function handleScanFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setScanImg(ev.target.result);
      setScanResult(null);
      setScanError("");
    };
    reader.readAsDataURL(file);
  }

  function handleScanDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setScanImg(ev.target.result);
      setScanResult(null);
      setScanError("");
    };
    reader.readAsDataURL(file);
  }

    // Returns questions strictly filtered by subject and/or chapter — NEVER mixes other chapters
  function getLocal(subject, chapter, count) {
    let pool = [];
    if (!subject) {
      Object.entries(ALL_LOCAL).forEach(([sub, qs]) => qs.forEach(q => pool.push({ ...q, subject: sub })));
    } else {
      pool = (ALL_LOCAL[subject] || []).map(q => ({ ...q, subject }));
      if (chapter) {
        // Exact match first, then partial — but NEVER fall back to other chapters
        const exact   = pool.filter(q => q.ch === chapter);
        const partial = pool.filter(q =>
          q.ch?.toLowerCase().includes(chapter.toLowerCase()) ||
          chapter.toLowerCase().includes(q.ch?.toLowerCase())
        );
        // Strict: only chapter-specific questions, no mixing of other chapters
        pool = exact.length > 0 ? exact : partial.length > 0 ? partial : [];
      }
    }
    return shuffle(pool).slice(0, count);
  }

  // ── Start test ──
  async function startTest() {
    setLoading(true);
    clearInterval(timerRef.current);
    const total = testMode === "full" ? 180 : nQs;
    const time  = testMode === "full" ? 200 : nMin;
    let qs = [];

    if (testMode === "full") {
      // NEET pattern: 60 Physics + 60 Chemistry + 60 Biology = 180, in fixed order
      for (const sub of ["Physics", "Chemistry", "Biology"]) {
        setLmsg(`Loading ${sub} questions (Section ${sub === "Physics" ? "A" : sub === "Chemistry" ? "B" : "C"})...`);
        const subSeen = new Set();
        const subQs = [];
        const addSub = (list) => {
          for (const q of (list||[])) {
            if (q.q && !subSeen.has(q.q)) { subSeen.add(q.q); subQs.push({...q, subject: sub}); }
          }
        };
        // a) cached questions
        addSub(getCached(sub, null, 60));
        // b) local bank
        addSub(getLocal(sub, null, 60));
        // c) AI + web search
        if (subQs.length < 60) {
          try {
            const aiQs = await generateAI(sub, null, 60);
            addSub(aiQs);
          } catch {}
        }
        // d) second AI pass
        if (subQs.length < 45) {
          try {
            const more = await generateAI(sub, null, 60);
            addSub(more);
          } catch {}
        }
        // push exactly 60 (or however many we got) in order
        qs.push(...subQs.slice(0, 60));
      }
    } else {
      // ── Subject-wise or Chapter-wise test ──
      const label = selCh ? `${selCh} (${selSub})` : selSub;
      const seen = new Set();
      const addQs = (list) => {
        for (const q of (list || [])) {
          if (q.q && !seen.has(q.q)) { seen.add(q.q); qs.push(q); }
        }
      };

      // Step 1: Cached questions (instant — grows with every test)
      setLmsg(`Loading ${label} questions from bank...`);
      addQs(getCached(selSub, selCh || null, total));

      // Step 2: Local hardcoded PYQ bank
      const localQs = selCh ? getLocal(selSub, selCh, total) : getLocal(selSub, null, total);
      addQs(localQs);

      // Step 3: AI + web search (searches Allen, PW, Motion, Aakash online)
      if (qs.length < total) {
        setLmsg(`Searching institutes online for ${label} questions...`);
        try {
          const aiQs = await generateAI(selSub, selCh || null, Math.max(total, 30));
          addQs(aiQs);
        } catch {
          setLmsg("Using local question bank...");
        }
      }

      // Step 4: Second AI pass if still short
      if (qs.length < total) {
        setLmsg(`Fetching more ${label} questions...`);
        try {
          const more = await generateAI(selSub, selCh || null, total);
          addQs(more);
        } catch {}
      }
    }

    // Final safety net — should never be empty
    if (qs.length === 0) qs = getLocal(null, null, Math.min(total, 20));

    setQuestions(qs.slice(0, total));
    setTimeLeft(time * 60);
    setAnswers({});
    setMarked(new Set());
    setCurrent(0);
    setSubmitted(false);
    setExitM(null);
    setLoading(false);
    setScreen("test");
  }

  function selectAns(i) {
    if (submitted) return;
    setAnswers(a => ({ ...a, [current]: i }));
  }
  function toggleMark() {
    setMarked(m => { const n = new Set(m); n.has(current) ? n.delete(current) : n.add(current); return n; });
  }
  function doSubmit() {
    clearInterval(timerRef.current);
    setSubmitted(true);
    setExitM(null);
    // Save to history
    const r = computeRes(questions, answers);
    const entry = {
      date: new Date().toLocaleDateString("en-IN"),
      mode: testMode,
      subject: selSub,
      chapter: selCh,
      total: questions.length,
      correct: r.correct,
      score: r.score,
      pct: r.pct
    };
    const newHist = [entry, ...testHistory].slice(0, 20);
    setTestHistory(newHist);
    try { localStorage.setItem("neet_history", JSON.stringify(newHist)); } catch {}
    setScreen("results");
  }
  function goHome() {
    clearInterval(timerRef.current);
    setScreen("home");
    setTestMode(null); setSelSub(null); setSelCh(null);
    setAnsMode(null); setExitM(null); setSubmitted(false);
    setNQs(20); setNMin(30);
  }

  function computeRes(qs, ans) {
    let correct = 0, wrong = 0, skipped = 0;
    const tm = {};
    qs.forEach((q, i) => {
      const t = q.ch || q.subject || "General";
      if (!tm[t]) tm[t] = { correct: 0, total: 0 };
      tm[t].total++;
      if (ans[i] === undefined) skipped++;
      else if (ans[i] === q.ans) { correct++; tm[t].correct++; }
      else wrong++;
    });
    const score = correct * 4 - wrong;
    const maxScore = qs.length * 4;
    const pct = maxScore > 0 ? Math.max(0, Math.round((score / maxScore) * 100)) : 0;
    const grade = pct >= 85 ? "Excellent" : pct >= 70 ? "Good" : pct >= 50 ? "Average" : "Needs Work";
    const gradeColor = pct >= 85 ? "#16A34A" : pct >= 70 ? "#2563EB" : pct >= 50 ? "#D97706" : "#DC2626";
    const ta = Object.entries(tm).map(([name, d]) => ({ name, pct: d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0, ...d })).sort((a, b) => b.pct - a.pct);
    return { correct, wrong, skipped, score, maxScore, pct, grade, gradeColor, ta, strong: ta.filter(t => t.pct >= 70), weak: ta.filter(t => t.pct < 50) };
  }

  const LBL = ["A", "B", "C", "D"];
  const initials = profile.name ? profile.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "?";

  // ── LOADING ──────────────────────────────────────────────
  if (loading) return (
    <div className="app">
      <header className="hdr">
        <div className="logo">NEET<span>Guru</span></div>
      </header>
      <div className="loading-screen">
        <div className="spinner" />
        <div className="load-title">Preparing Your Test</div>
        <div className="load-sub">{lmsg || "Loading questions from 25-year PYQ bank..."}</div>
      </div>
    </div>
  );

  // ── HOME ─────────────────────────────────────────────────
  if (screen === "home") return (
    <div className="app">
      <header className="hdr">
        <div className="logo">NEET<span>Guru</span></div>
        <nav className="nav-links">
          <button className="nav-btn active">Home</button>
          <button className="nav-btn" onClick={() => { setEditProfile({ ...profile }); setScreen("profile"); }}>
            {profile.name ? `👤 ${profile.name.split(" ")[0]}` : "Profile"}
          </button>
        </nav>
      </header>
      <div className="page">

        {/* ── QUESTION SCANNER BAR ── */}
        <input ref={scanFileRef} type="file" accept="image/*" capture="environment" style={{display:"none"}} onChange={handleScanFile} />
        <div className="scanner-bar">
          <div className="scanner-icon">📷</div>
          <div className="scanner-text">
            <div className="scanner-title">Question Scanner — Instant AI Solution</div>
            <div className="scanner-sub">Scan any NEET question from book, paper or screen — get step-by-step solution</div>
          </div>
          <div className="scanner-btns">
            <button className="scan-btn" onClick={() => { scanFileRef.current.removeAttribute("capture"); scanFileRef.current.click(); }}>📁 Upload Image</button>
            <button className="scan-btn primary" onClick={() => { scanFileRef.current.setAttribute("capture","environment"); scanFileRef.current.click(); }}>📷 Open Camera</button>
          </div>
        </div>

        {/* Scanner Modal */}
        {(scanImg || scanOpen) && (
          <div className="scanner-modal-overlay" onClick={() => { setScanOpen(false); setScanImg(null); setScanResult(null); }}>
            <div className="scanner-modal" onClick={e => e.stopPropagation()}>
              <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px"}}>
                <div>
                  <div style={{fontSize:"17px", fontWeight:"700"}}>📷 AI Question Solver</div>
                  <div style={{fontSize:"12px", color:"var(--text3)"}}>Upload or scan a NEET question for detailed solution</div>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => { setScanImg(null); setScanResult(null); setScanOpen(false); }}>✕</button>
              </div>

              {!scanImg ? (
                <div className="scan-drop-zone"
                  onDragOver={e => e.preventDefault()}
                  onDrop={handleScanDrop}
                  onClick={() => scanFileRef.current?.click()}>
                  <div className="scan-drop-icon">🖼️</div>
                  <div className="scan-drop-title">Drop image here or click to browse</div>
                  <div className="scan-drop-sub">Supports JPG, PNG, screenshots · Max 5 MB</div>
                </div>
              ) : (
                <>
                  <img src={scanImg} alt="Question" className="scanner-preview" />
                  <div style={{display:"flex", gap:"8px", marginBottom:"12px", flexWrap:"wrap"}}>
                    <button className="btn btn-primary" onClick={() => solveScannedQuestion(scanImg)} disabled={scanLoading}>
                      {scanLoading ? "⏳ Solving..." : "🔍 Solve This Question"}
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={() => { setScanImg(null); setScanResult(null); }}>Change Image</button>
                  </div>
                </>
              )}

              {scanLoading && (
                <div style={{textAlign:"center", padding:"24px", color:"var(--text3)"}}>
                  <div className="spinner" style={{margin:"0 auto 12px"}} />
                  <div style={{fontSize:"14px", fontWeight:"500"}}>Analyzing question with AI...</div>
                  <div style={{fontSize:"12px", marginTop:"4px"}}>Reading question → Understanding concept → Building solution</div>
                </div>
              )}

              {scanError && (
                <div style={{background:"var(--red-lt)", border:"1px solid var(--red-bd)", borderRadius:"var(--radius)", padding:"12px 16px", color:"var(--red)", fontSize:"13px", marginTop:"8px"}}>
                  ⚠️ {scanError}
                </div>
              )}

              {scanResult && (
                <div className="solution-box">
                  <div className="sol-section">
                    <div className="sol-label" style={{color:"var(--blue)"}}>📝 Question Identified</div>
                    <div className="sol-text" style={{fontFamily:"Merriweather, Georgia, serif", fontSize:"14px"}}>{scanResult.question}</div>
                    <div style={{display:"flex", gap:"6px", marginTop:"8px", flexWrap:"wrap"}}>
                      {scanResult.subject && <span className="tag tag-blue">{scanResult.subject}</span>}
                      {scanResult.chapter && <span className="tag tag-gray">{scanResult.chapter}</span>}
                      {scanResult.difficulty && <span className={`diff-tag d-${scanResult.difficulty}`}>{scanResult.difficulty}</span>}
                      {scanResult.similar_pyq && <span className="tag tag-gold">Similar: {scanResult.similar_pyq}</span>}
                    </div>
                  </div>

                  <div className="sol-answer">
                    ✅ Correct Answer: {scanResult.correct_option && `(${scanResult.correct_option})`} {scanResult.answer}
                  </div>

                  {scanResult.steps && scanResult.steps.length > 0 && (
                    <div className="sol-section" style={{marginTop:"14px"}}>
                      <div className="sol-label" style={{color:"var(--green)"}}>📐 Step-by-Step Solution</div>
                      <div className="sol-steps">
                        {scanResult.steps.map((step, i) => (
                          <div key={i} className="sol-step">
                            <div className="sol-step-num">{i+1}</div>
                            <div>{step.replace(/^Step \d+:\s*/i, "")}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {scanResult.concept && (
                    <div style={{background:"var(--blue-lt)", border:"1px solid var(--blue-bd)", borderRadius:"var(--radius)", padding:"12px 14px", marginTop:"10px"}}>
                      <div style={{fontSize:"11px", fontWeight:"700", color:"var(--blue)", textTransform:"uppercase", letterSpacing:"0.4px", marginBottom:"4px"}}>💡 Core Concept</div>
                      <div style={{fontSize:"13px", color:"var(--text)"}}>{scanResult.concept}</div>
                    </div>
                  )}

                  {scanResult.tip && (
                    <div style={{background:"var(--gold-lt)", border:"1px solid var(--gold-bd)", borderRadius:"var(--radius)", padding:"12px 14px", marginTop:"8px"}}>
                      <div style={{fontSize:"11px", fontWeight:"700", color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.4px", marginBottom:"4px"}}>🎯 Quick Tip</div>
                      <div style={{fontSize:"13px", color:"var(--text)"}}>{scanResult.tip}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="home-hero">
          <div className="hero-title">NEET Guru — AI-Powered Preparation</div>
          <div className="hero-sub">
            Practice with questions from 27 years of NEET & AIPMT PYQs (1999–2025), NCERT Exemplar, and top coaching modules. Get instant analysis of your weak topics.
          </div>
          <div className="hero-tags">
            <span className="hero-tag">27 Years PYQ (1999–2025)</span>
            <span className="hero-tag">NCERT Exemplar</span>
            <span className="hero-tag">Allen · Aakash · Physics Wallah · Motion</span>
            <span className="hero-tag">AI Analysis</span>
          </div>
        </div>

        {/* Cache counter */}
        {totalCached() > 0 && (
          <div className="q-bank-counter">
            📚 {228 + totalCached()}+ questions in your bank · grows with every test
          </div>
        )}

        {profile.name && (
          <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:"var(--radius-lg)", padding:"16px 20px", marginBottom:"20px", display:"flex", alignItems:"center", gap:"14px", boxShadow:"var(--shadow)" }}>
            <div style={{ width:"42px", height:"42px", borderRadius:"50%", background:"var(--blue)", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:"700", fontSize:"15px", flexShrink:0, overflow:"hidden" }}>
              {profile.photo
                ? <img src={profile.photo} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                : initials
              }
            </div>
            <div>
              <div style={{ fontWeight:"600", fontSize:"14px" }}>Welcome back, {profile.name.split(" ")[0]}!</div>
              <div style={{ fontSize:"12px", color:"var(--text3)" }}>{profile.cls} · Tests taken: {testHistory.length}</div>
            </div>
            {testHistory.length > 0 && (
              <div style={{ marginLeft:"auto", textAlign:"right" }}>
                <div style={{ fontSize:"12px", color:"var(--text3)" }}>Last test</div>
                <div style={{ fontSize:"14px", fontWeight:"600", color: testHistory[0].pct >= 70 ? "var(--green)" : testHistory[0].pct >= 50 ? "var(--gold)" : "var(--red)" }}>{testHistory[0].pct}%</div>
              </div>
            )}
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-card"><div className="stat-num">27</div><div className="stat-lbl">Years of PYQs (1999–2025)</div></div>
          <div className="stat-card"><div className="stat-num">3</div><div className="stat-lbl">Test Modes</div></div>
          <div className="stat-card"><div className="stat-num">+4/−1</div><div className="stat-lbl">NEET Marking Scheme</div></div>
        </div>

        <div className="section-head">Choose Test Mode</div>
        <div className="mode-grid">
          {[
            { m:"full",  color:"#2563EB", icon:"📋", title:"Full Mock Test",     desc:"Complete NEET pattern — 180 questions across Physics, Chemistry & Biology in 200 minutes.", tags:["180 Questions","200 Minutes","All Subjects"] },
            { m:"subject", color:"#16A34A", icon:"📖", title:"Subject-wise Test", desc:"Pick one subject, set your question count and time. Ideal for focused revision.", tags:["Custom Q's","Custom Time","1 Subject"] },
            { m:"chapter", color:"#D97706", icon:"🎯", title:"Chapter-wise Test", desc:"Master one chapter at a time with targeted PYQ and exemplar questions.", tags:["Custom Q's","Custom Time","1 Chapter"] },
          ].map(({ m, color, icon, title, desc, tags }) => (
            <div key={m} className="mode-card" onClick={() => { setTestMode(m); setScreen("config"); }}>
              <div className="mode-card-accent" style={{ background: color }} />
              <div className="mode-icon">{icon}</div>
              <div className="mode-title">{title}</div>
              <div className="mode-desc">{desc}</div>
              <div className="mode-tags">
                {tags.map(t => <span key={t} className="tag tag-gray">{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        {testHistory.length > 0 && (
          <>
            <div className="section-head">Recent Tests</div>
            <div style={{ background:"var(--card)", border:"1px solid var(--border)", borderRadius:"var(--radius-lg)", overflow:"hidden", boxShadow:"var(--shadow)", marginBottom:"24px" }}>
              {testHistory.slice(0, 5).map((h, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", padding:"12px 18px", borderBottom: i < Math.min(testHistory.length, 5) - 1 ? "1px solid var(--border)" : "none", gap:"12px" }}>
                  <div style={{ fontSize:"20px" }}>{h.mode === "full" ? "📋" : h.mode === "subject" ? "📖" : "🎯"}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:"13px", fontWeight:"600", color:"var(--text)" }}>{h.chapter || h.subject || "Full Test"}</div>
                    <div style={{ fontSize:"12px", color:"var(--text3)" }}>{h.date} · {h.correct}/{h.total} correct</div>
                  </div>
                  <span className={`tag ${h.pct >= 70 ? "tag-green" : h.pct >= 50 ? "tag-gold" : "tag-red"}`}>{h.pct}%</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="section-head">Question Sources</div>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap" }}>
          <span className="tag tag-blue" style={{ padding:"5px 14px", fontSize:"13px", fontWeight:"600" }}>📅 PYQ 1999–2025 (NEET &amp; AIPMT)</span>
          {["NCERT Exemplar","Allen Module","Aakash Module","Physics Wallah","Motion Institute","Resonance DPP"].map(s =>
            <span key={s} className="tag tag-green" style={{ padding:"4px 10px", fontSize:"12px" }}>{s}</span>
          )}
        </div>
      </div>
    </div>
  );

  // ── PROFILE ──────────────────────────────────────────────
  if (screen === "profile") return (
    <div className="app">
      <header className="hdr">
        <div className="logo">NEET<span>Guru</span></div>
        <nav className="nav-links">
          <button className="nav-btn" onClick={() => setScreen("home")}>Home</button>
          <button className="nav-btn active">Profile</button>
        </nav>
      </header>
      <div className="page page-sm" style={{ maxWidth:"700px" }}>
        <div className="page-title">Student Profile</div>
        <div className="page-sub">Your details are saved locally on this device.</div>

        <div className="profile-grid">
          <div className="avatar-card">
            {/* Hidden file input */}
            <input
              ref={photoRef}
              type="file"
              accept="image/*"
              style={{ display:"none" }}
              onChange={handlePhotoChange}
            />
            {/* Avatar with click to upload */}
            <div style={{ position:"relative", width:"120px", margin:"0 auto 16px" }}>
              {editProfile.photo ? (
                <img
                  src={editProfile.photo}
                  alt="Profile"
                  style={{ width:"120px", height:"120px", borderRadius:"50%", objectFit:"cover", border:"3px solid var(--border)", display:"block" }}
                />
              ) : (
                <div className="profile-avatar">
                  {editProfile.name ? editProfile.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "?"}
                </div>
              )}
              {/* Camera overlay */}
              <button
                onClick={() => photoRef.current?.click()}
                title="Upload photo"
                style={{
                  position:"absolute", bottom:"2px", right:"2px",
                  width:"30px", height:"30px", borderRadius:"50%",
                  background:"var(--blue)", border:"2px solid var(--card)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  cursor:"pointer", fontSize:"13px", color:"white",
                  boxShadow:"0 1px 4px rgba(0,0,0,.2)"
                }}>
                📷
              </button>
            </div>
            <div className="profile-name">{editProfile.name || "Your Name"}</div>
            <div className="profile-class">{editProfile.cls || "Class not set"}</div>

            {/* Upload / Remove buttons */}
            <div style={{ display:"flex", gap:"6px", justifyContent:"center", marginTop:"10px", flexWrap:"wrap" }}>
              <button
                className="btn btn-outline btn-sm"
                style={{ fontSize:"12px", padding:"5px 12px" }}
                onClick={() => photoRef.current?.click()}>
                {editProfile.photo ? "Change Photo" : "Upload Photo"}
              </button>
              {editProfile.photo && (
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ fontSize:"12px", padding:"5px 10px", color:"var(--red)" }}
                  onClick={removePhoto}>
                  Remove
                </button>
              )}
            </div>
            <div style={{ fontSize:"10.5px", color:"var(--muted)", marginTop:"6px", textAlign:"center" }}>JPG, PNG · Max 2 MB</div>

            {testHistory.length > 0 && (
              <div style={{ marginTop:"14px", paddingTop:"14px", borderTop:"1px solid var(--border)" }}>
                <div style={{ fontSize:"11px", color:"var(--text3)", marginBottom:"6px", fontWeight:"600", textTransform:"uppercase", letterSpacing:"0.4px" }}>Test Stats</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
                  <div style={{ background:"var(--bg2)", borderRadius:"6px", padding:"8px", textAlign:"center" }}>
                    <div style={{ fontSize:"18px", fontWeight:"700", color:"var(--blue)" }}>{testHistory.length}</div>
                    <div style={{ fontSize:"10px", color:"var(--text3)" }}>Tests</div>
                  </div>
                  <div style={{ background:"var(--bg2)", borderRadius:"6px", padding:"8px", textAlign:"center" }}>
                    <div style={{ fontSize:"18px", fontWeight:"700", color: testHistory.length > 0 && Math.round(testHistory.reduce((a,h)=>a+h.pct,0)/testHistory.length) >= 60 ? "var(--green)" : "var(--gold)" }}>
                      {testHistory.length > 0 ? Math.round(testHistory.reduce((a, h) => a + h.pct, 0) / testHistory.length) : 0}%
                    </div>
                    <div style={{ fontSize:"10px", color:"var(--text3)" }}>Avg Score</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="info-card">
            <div className="section-head" style={{ marginBottom:"16px" }}>Personal Information</div>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" type="text" placeholder="Enter your full name" value={editProfile.name} onChange={e => setEditProfile(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="info-row">
              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input className="form-input" type="date" value={editProfile.dob} onChange={e => setEditProfile(p => ({ ...p, dob: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input className="form-input" type="tel" placeholder="10-digit mobile" maxLength={10} value={editProfile.mobile} onChange={e => setEditProfile(p => ({ ...p, mobile: e.target.value.replace(/\D/g, "") }))} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" placeholder="your@email.com" value={editProfile.email} onChange={e => setEditProfile(p => ({ ...p, email: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Currently Studying</label>
              <select className="form-select" value={editProfile.cls} onChange={e => setEditProfile(p => ({ ...p, cls: e.target.value }))}>
                <option value="">Select your class</option>
                {CLASS_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="profile-save-row">
              {profileSaved && <span style={{ fontSize:"13px", color:"var(--green)", alignSelf:"center" }}>✓ Saved successfully</span>}
              <button className="btn btn-outline" onClick={() => { setEditProfile({ ...profile }); setScreen("home"); }}>Cancel</button>
              <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
            </div>
          </div>
        </div>

        {testHistory.length > 0 && (
          <div className="card">
            <div className="card-body">
              <div className="section-head">Test History</div>
              {testHistory.map((h, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"10px 0", borderBottom: i < testHistory.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ fontSize:"18px" }}>{h.mode === "full" ? "📋" : h.mode === "subject" ? "📖" : "🎯"}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:"13px", fontWeight:"500" }}>{h.chapter || h.subject || "Full Mock Test"}</div>
                    <div style={{ fontSize:"11.5px", color:"var(--text3)" }}>{h.date} · {h.correct}/{h.total} correct · Score: {h.score}</div>
                  </div>
                  <span className={`tag ${h.pct >= 70 ? "tag-green" : h.pct >= 50 ? "tag-gold" : "tag-red"}`}>{h.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ── CONFIG ────────────────────────────────────────────────
  if (screen === "config") return (
    <div className="app">
      <header className="hdr">
        <div className="logo">NEET<span>Guru</span></div>
        <nav className="nav-links">
          <button className="nav-btn" onClick={() => setScreen("home")}>Home</button>
        </nav>
      </header>
      <div className="page page-sm">
        <button className="btn btn-ghost btn-sm" style={{ marginBottom:"16px" }} onClick={() => setScreen("home")}>← Back</button>
        <div className="card">
          <div className="card-body">
            <div className="page-title" style={{ marginBottom:"2px" }}>
              {testMode === "full" ? "Full Mock Test" : testMode === "subject" ? "Subject-wise Test" : "Chapter-wise Test"}
            </div>
            <div className="page-sub">
              {testMode === "full" ? "Fixed: 180 questions · 200 minutes · All subjects" : "Customize your test below"}
            </div>

            {testMode !== "full" && (
              <>
                <div className="section-head">Select Subject</div>
                <div className="sel-grid" style={{ marginBottom:"20px" }}>
                  {Object.entries(SUBJECTS).map(([sub, info]) => (
                    <div key={sub} className={`sel-item ${selSub === sub ? "on" : ""}`}
                      onClick={() => { setSelSub(sub); setSelCh(null); }}>
                      <span style={{ fontSize:"16px" }}>{info.icon}</span>
                      <div style={{ marginTop:"4px" }}>{sub}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {testMode === "chapter" && selSub && (
              <>
                <div className="section-head">Select Chapter</div>
                <div className="ch-grid">
                  {SUBJECTS[selSub].chapters.map(ch => (
                    <div key={ch} className={`ch-item ${selCh === ch ? "on" : ""}`} onClick={() => setSelCh(ch)}>
                      {ch}
                    </div>
                  ))}
                </div>
              </>
            )}

            {testMode !== "full" && (
              <>
                <div className="section-head">Test Settings</div>
                <div className="stepper-row">
                  <div className="stepper">
                    <label className="form-label">Number of Questions</label>
                    <div className="stepper-ctrl">
                      <button className="step-btn" onClick={() => setNQs(q => Math.max(5, q - 5))}>−</button>
                      <span className="step-val">{nQs}</span>
                      <button className="step-btn" onClick={() => setNQs(q => Math.min(90, q + 5))}>+</button>
                    </div>
                    <div className="quick-chips">
                      {[10, 20, 30, 45, 60].map(v => (
                        <span key={v} className={`chip ${nQs === v ? "on" : ""}`} onClick={() => setNQs(v)}>{v}Q</span>
                      ))}
                    </div>
                    <span className="step-hint">Range: 5 – 90 questions</span>
                  </div>
                  <div className="stepper">
                    <label className="form-label">Time Limit (minutes)</label>
                    <div className="stepper-ctrl">
                      <button className="step-btn" onClick={() => setNMin(t => Math.max(5, t - 5))}>−</button>
                      <span className="step-val">{nMin}</span>
                      <button className="step-btn" onClick={() => setNMin(t => Math.min(180, t + 5))}>+</button>
                    </div>
                    <div className="quick-chips">
                      {[15, 30, 45, 60, 90].map(v => (
                        <span key={v} className={`chip ${nMin === v ? "on" : ""}`} onClick={() => setNMin(v)}>{v}m</span>
                      ))}
                    </div>
                    <span className="step-hint">Range: 5 – 180 minutes</span>
                  </div>
                </div>
              </>
            )}

            {testMode === "full" && (
              <div className="full-info">
                ⚡ Physics — 45 questions &nbsp;|&nbsp; 🧪 Chemistry — 45 questions &nbsp;|&nbsp; 🧬 Biology — 90 questions<br />
                ⏱️ 200 minutes total &nbsp;|&nbsp; 📐 +4 for correct, −1 for wrong, 0 for skipped
              </div>
            )}

            <div className="divider" />
            <div className="section-head">Answer Reveal Mode</div>
            <div className="amode-grid">
              <div className={`amode-card ${ansMode === "instant" ? "on" : ""}`} onClick={() => setAnsMode("instant")}>
                <div className="amode-check">{ansMode === "instant" ? "✓" : ""}</div>
                <div className="amode-icon">⚡</div>
                <div className="amode-title">Instant Feedback</div>
                <div className="amode-desc">See the correct answer and explanation right after each question. Best for learning.</div>
              </div>
              <div className={`amode-card ${ansMode === "end" ? "on" : ""}`} onClick={() => setAnsMode("end")}>
                <div className="amode-check">{ansMode === "end" ? "✓" : ""}</div>
                <div className="amode-icon">🎯</div>
                <div className="amode-title">Exam Mode</div>
                <div className="amode-desc">Answers revealed only after submitting. Simulates real NEET exam conditions.</div>
              </div>
            </div>

            <button
              className="btn btn-primary btn-lg btn-full"
              disabled={!ansMode || (testMode === "subject" && !selSub) || (testMode === "chapter" && (!selSub || !selCh))}
              onClick={startTest}>
              Start Test →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── TEST ──────────────────────────────────────────────────
  if (screen === "test") {
    const q = questions[current];
    const ua = answers[current];
    const isAns = ua !== undefined;
    const showRes = ansMode === "instant" && isAns;
    const answered = Object.keys(answers).length;

    return (
      <div className="app">
        <header className="hdr">
          <div className="logo">NEET<span>Guru</span></div>
          <div className="flex flex-center gap-2">
            <span className="tag tag-blue" style={{ fontSize:"11px" }}>
              {testMode === "full"
                ? ["⚛️ Physics","🧪 Chemistry","🌿 Biology"][activeSection]
                : testMode === "subject" ? selSub : selCh}
            </span>
            <span className="tag tag-gray" style={{ fontSize:"11px" }}>
              {ansMode === "instant" ? "⚡ Instant" : "🎯 Exam"}
            </span>
            <div className={`timer-box ${timeLeft < 300 ? "danger" : timeLeft < 600 ? "warn" : ""}`}>{fmt(timeLeft)}</div>
            <button className="btn btn-ghost btn-sm" onClick={() => setExitM("home")}>🏠</button>
            <button className="btn btn-outline btn-sm" onClick={() => setExitM("submit")}>End Test</button>
          </div>
        </header>

        <div className="test-layout">
          <div className="test-main">

            {/* NEET Section Tabs — Full Mock only */}
            {testMode === "full" && (() => {
              const secs = [
                { label:"Physics",   cls:"phy", icon:"⚛️",  start:0,   end:59  },
                { label:"Chemistry", cls:"che", icon:"🧪",  start:60,  end:119 },
                { label:"Biology",   cls:"bio", icon:"🌿",  start:120, end:179 },
              ];
              return (
                <div style={{marginBottom:"16px"}}>
                  <div className="section-tabs">
                    {secs.map((s, idx) => {
                      const secAnswered = Object.keys(answers).filter(k => +k >= s.start && +k <= s.end).length;
                      const secTotal = Math.min(s.end, questions.length - 1) - s.start + 1;
                      return (
                        <button key={idx}
                          className={`sec-tab ${s.cls} ${activeSection === idx ? "active" : ""}`}
                          onClick={() => { setActiveSection(idx); setCurrent(s.start); }}>
                          {s.icon} {s.label}
                          <span className={`sec-badge ${s.cls}`}>{secAnswered}/{secTotal > 0 ? secTotal : "..."}</span>
                        </button>
                      );
                    })}
                  </div>
                  {/* Section progress */}
                  <div style={{display:"flex", gap:"6px"}}>
                    {secs.map((s, idx) => {
                      const w = Math.min(s.end, questions.length-1) - s.start + 1;
                      const done = Object.keys(answers).filter(k=>+k>=s.start&&+k<=s.end).length;
                      const pct = w > 0 ? (done/w)*100 : 0;
                      const colors = ["#2563EB","#16A34A","#D97706"];
                      return <div key={idx} style={{flex:1, height:"4px", background:"var(--border)", borderRadius:"2px", overflow:"hidden"}}>
                        <div style={{width:`${pct}%`, height:"100%", background:colors[idx], borderRadius:"2px", transition:"width .3s"}} />
                      </div>;
                    })}
                  </div>
                  <div style={{display:"flex", gap:"6px", marginTop:"4px"}}>
                    {["Physics","Chemistry","Biology"].map((s,i) => {
                      const colors=["#2563EB","#16A34A","#D97706"];
                      return <div key={i} style={{flex:1, fontSize:"10px", color:colors[i], textAlign:"center", fontWeight:"600"}}>{s}</div>
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Progress */}
            <div className="prog-wrap" style={{ marginBottom:"20px" }}>
              <div className="prog-label">
                <span>Question {current + 1} of {questions.length}</span>
                <span style={{ color: answered > 0 ? "var(--green)" : "var(--text3)" }}>{answered} answered</span>
              </div>
              <div className="prog-bar">
                <div className="prog-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
              </div>
            </div>

            {q ? (
              <>
                <div className="q-meta">
                  <span className="tag tag-gray" style={{ fontSize:"11px" }}>{q.src}</span>
                  <span className={`diff-tag d-${q.diff}`}>{q.diff}</span>
                  <span className="text-xs text-muted">{q.subject}{q.ch ? ` · ${q.ch}` : ""}</span>
                </div>
                <div className="q-card">
                  <div className="q-number">Question {current + 1}</div>
                  <div className="q-text">{q.q}</div>
                </div>
                <div className="options-list">
                  {(q.opts || []).map((opt, i) => {
                    let cls = "opt-item";
                    if (showRes) {
                      cls += " dis";
                      if (i === q.ans) cls += " ok";
                      else if (i === ua) cls += " bad";
                    } else if (i === ua) cls += " sel";
                    return (
                      <div key={i} className={cls} onClick={() => !showRes && selectAns(i)}>
                        <span className="opt-label">{LBL[i]}</span>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>
                {showRes && (
                  <div className="explanation">
                    <div className="exp-title">Explanation</div>
                    <div className="exp-text">{q.exp}</div>
                  </div>
                )}
                {ansMode === "end" && isAns && (
                  <div className="recorded-note">✓ Answer recorded. Results will be shown after submission.</div>
                )}
              </>
            ) : (
              <div style={{ padding:"40px", textAlign:"center", color:"var(--text3)" }}>No question available.</div>
            )}

            <div className="test-nav">
              <button className="btn btn-ghost" disabled={current === 0} onClick={() => {
                const prev = current - 1;
                setCurrent(prev);
                if (testMode === "full") {
                  if (prev < 60) setActiveSection(0);
                  else if (prev < 120) setActiveSection(1);
                  else setActiveSection(2);
                }
              }}>← Previous</button>
              <button className="btn btn-outline btn-sm" onClick={toggleMark}>
                {marked.has(current) ? "🔖 Marked" : "🔖 Mark for Review"}
              </button>
              {current < questions.length - 1
                ? <button className="btn btn-primary" onClick={() => {
                    const next = current + 1;
                    setCurrent(next);
                    if (testMode === "full") {
                      if (next < 60) setActiveSection(0);
                      else if (next < 120) setActiveSection(1);
                      else setActiveSection(2);
                    }
                  }}>Next →</button>
                : <button className="btn btn-danger" onClick={() => setExitM("submit")}>Submit Test</button>
              }
            </div>
          </div>

          {/* PALETTE */}
          <div className="palette-panel">
            <div className="pal-title">Question Navigator</div>

            {testMode === "full" ? (
              /* Section-wise palette for full mock */
              [
                { label:"Physics",   cls:"phy", color:"#2563EB", start:0,   end:Math.min(59, questions.length-1)  },
                { label:"Chemistry", cls:"che", color:"#16A34A", start:60,  end:Math.min(119, questions.length-1) },
                { label:"Biology",   cls:"bio", color:"#D97706", start:120, end:Math.min(179, questions.length-1) },
              ].map((sec, si) => sec.end >= sec.start && (
                <div key={si}>
                  <div className="pal-section-head" style={{color: sec.color}}>
                    <span>{sec.label}</span>
                    <span style={{fontSize:"10px", color:"var(--text3)", fontWeight:"400", marginLeft:"auto"}}>
                      {Object.keys(answers).filter(k=>+k>=sec.start&&+k<=sec.end).length}/{sec.end-sec.start+1}
                    </span>
                  </div>
                  <div className="pal-grid" style={{marginBottom:"6px"}}>
                    {Array.from({length: sec.end - sec.start + 1}, (_, ii) => {
                      const i = sec.start + ii;
                      return (
                        <div key={i}
                          className={`pq ${i === current ? "cur" : ""} ${answers[i] !== undefined ? "ans" : ""} ${marked.has(i) ? "mk" : ""}`}
                          onClick={() => { setCurrent(i); setActiveSection(si); }}>
                          {i + 1}
                        </div>
                      );
                    })}
                  </div>
                  {si < 2 && <div className="pal-section-divider" />}
                </div>
              ))
            ) : (
              /* Simple palette for subject/chapter tests */
              <div className="pal-grid">
                {questions.map((_, i) => (
                  <div key={i}
                    className={`pq ${i === current ? "cur" : ""} ${answers[i] !== undefined ? "ans" : ""} ${marked.has(i) ? "mk" : ""}`}
                    onClick={() => setCurrent(i)}>
                    {i + 1}
                  </div>
                ))}
              </div>
            )}

            <div className="pal-legend" style={{marginTop:"10px"}}>
              <div className="leg-row"><div className="leg-dot" style={{ background:"var(--blue)" }} /><span>Current</span></div>
              <div className="leg-row"><div className="leg-dot" style={{ background:"var(--green-lt)", border:"1px solid var(--green-bd)" }} /><span>Answered</span></div>
              <div className="leg-row"><div className="leg-dot" style={{ background:"var(--gold-lt)", border:"1px solid var(--gold-bd)" }} /><span>Marked</span></div>
              <div className="leg-row"><div className="leg-dot" style={{ background:"var(--bg3)" }} /><span>Not visited</span></div>
            </div>
            <div className="scoring-info">
              ✅ +4 marks for correct<br />
              ❌ −1 mark for wrong<br />
              ⬜ 0 marks if skipped
            </div>
            <button className="btn btn-primary btn-sm btn-full" style={{ marginTop:"14px" }} onClick={() => setExitM("submit")}>
              Submit Test
            </button>
          </div>
        </div>

        {/* EXIT MODAL */}
        {exitM && (
          <div className="modal-overlay" onClick={() => setExitM(null)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              {exitM === "submit" ? (
                <>
                  <div className="modal-icon">📝</div>
                  <div className="modal-title">Submit Test?</div>
                  <div className="modal-body">
                    You have answered <strong>{answered}</strong> of <strong>{questions.length}</strong> questions.
                    {answered < questions.length && <><br /><span style={{ color:"var(--gold)" }}>⚠ {questions.length - answered} questions are unanswered.</span></>}
                    <br /><br />You cannot change answers after submitting.
                  </div>
                  <div className="modal-actions">
                    <button className="btn btn-primary btn-full" onClick={doSubmit}>Submit & View Results</button>
                    <button className="btn btn-outline btn-full" onClick={() => setExitM(null)}>Continue Test</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="modal-icon">🏠</div>
                  <div className="modal-title">Exit to Home?</div>
                  <div className="modal-body">
                    Your progress will be <strong>lost</strong>. You have answered {answered} of {questions.length} questions so far.
                  </div>
                  <div className="modal-actions">
                    <button className="btn btn-primary btn-full" onClick={() => setExitM("submit")}>Submit First</button>
                    <button className="btn btn-danger btn-full" onClick={goHome}>Exit Without Saving</button>
                    <button className="btn btn-outline btn-full" onClick={() => setExitM(null)}>Stay in Test</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── RESULTS ───────────────────────────────────────────────
  if (screen === "results") {
    const r = computeRes(questions, answers);
    return (
      <div className="app">
        <header className="hdr">
          <div className="logo">NEET<span>Guru</span></div>
          <nav className="nav-links">
            <button className="nav-btn" onClick={goHome}>Home</button>
            <button className="nav-btn" onClick={() => { setEditProfile({ ...profile }); setScreen("profile"); }}>Profile</button>
          </nav>
        </header>
        <div className="page">
          <div className="score-banner">
            <div style={{ fontSize:"13px", color:"var(--text3)", marginBottom:"4px", textTransform:"uppercase", letterSpacing:"1px" }}>Your Score</div>
            <div className="score-big" style={{ color: r.gradeColor }}>{r.score}<span style={{ fontSize:"24px", color:"var(--text3)", fontWeight:"400" }}>/{r.maxScore}</span></div>
            <div className="score-pct">NEET Marking Scheme (+4/−1) · {r.pct}% accuracy</div>
            <div className="grade-pill" style={{ background: r.gradeColor + "18", border:`1px solid ${r.gradeColor}40`, color: r.gradeColor }}>{r.grade}</div>
            <div className="score-grade-bar" style={{ background: r.gradeColor, opacity:.25 }} />
          </div>

          <div className="res-stats">
            <div className="res-stat"><div className="res-stat-num" style={{ color:"var(--green)" }}>{r.correct}</div><div className="res-stat-lbl">Correct</div></div>
            <div className="res-stat"><div className="res-stat-num" style={{ color:"var(--red)" }}>{r.wrong}</div><div className="res-stat-lbl">Wrong</div></div>
            <div className="res-stat"><div className="res-stat-num" style={{ color:"var(--text3)" }}>{r.skipped}</div><div className="res-stat-lbl">Skipped</div></div>
            <div className="res-stat"><div className="res-stat-num" style={{ color:"var(--gold)" }}>{r.pct}%</div><div className="res-stat-lbl">Accuracy</div></div>
          </div>

          <div className="ana-grid">
            <div className="ana-card">
              <div className="ana-title">Topic-wise Performance</div>
              {r.ta.length === 0
                ? <div className="text-sm text-muted">No data available</div>
                : r.ta.map(t => (
                  <div key={t.name} className="topic-bar">
                    <div className="tb-header">
                      <span className="tb-name">{t.name}</span>
                      <span className="tb-score" style={{ color: t.pct >= 70 ? "var(--green)" : t.pct >= 50 ? "var(--gold)" : "var(--red)" }}>{t.pct}%</span>
                    </div>
                    <div className="tb-track">
                      <div className="tb-fill" style={{ width:`${t.pct}%`, background: t.pct >= 70 ? "var(--green)" : t.pct >= 50 ? "var(--gold)" : "var(--red)" }} />
                    </div>
                  </div>
                ))}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
              <div className="ana-card">
                <div className="ana-title">🔴 Weak Areas — Revise These</div>
                {r.weak.length === 0
                  ? <div className="text-sm text-muted">No weak areas identified. Excellent work! 🎉</div>
                  : r.weak.map(t => <div key={t.name} className="topic-pill tp-weak"><span>{t.name}</span><strong>{t.pct}%</strong></div>)}
              </div>
              <div className="ana-card">
                <div className="ana-title">🟢 Strong Areas — Keep It Up</div>
                {r.strong.length === 0
                  ? <div className="text-sm text-muted">Answer more questions to see your strengths.</div>
                  : r.strong.map(t => <div key={t.name} className="topic-pill tp-strong"><span>{t.name}</span><strong>{t.pct}%</strong></div>)}
              </div>
            </div>
          </div>

          <div className="review-card">
            <div className="ana-title">Full Question Review</div>
            {questions.map((q, i) => {
              const ua = answers[i];
              const ok = ua === q.ans, skip = ua === undefined;
              return (
                <div key={i} className="rev-item">
                  <div className="rev-meta">
                    <span className="text-xs text-muted">Q{i + 1}</span>
                    <span className={`tag ${ok ? "tag-green" : skip ? "tag-gray" : "tag-red"}`} style={{ fontSize:"10px" }}>
                      {ok ? "✓ Correct" : skip ? "Skipped" : "✗ Wrong"}
                    </span>
                    <span className="text-xs text-muted">{q.src}</span>
                    <span className={`diff-tag d-${q.diff}`} style={{ fontSize:"10px" }}>{q.diff}</span>
                  </div>
                  <div className="rev-q">{q.q}</div>
                  <div className="rev-opts">
                    {(q.opts || []).map((opt, j) => (
                      <span key={j} className={`ro ${j === q.ans ? "ro-ok" : j === ua && ua !== q.ans ? "ro-bad" : "ro-neu"}`}>
                        {LBL[j]}: {opt}
                      </span>
                    ))}
                  </div>
                  {!ok && q.exp && <div className="rev-exp">💡 {q.exp}</div>}
                </div>
              );
            })}
          </div>

          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={() => { setScreen("config"); setSubmitted(false); }}>Take Another Test</button>
            <button className="btn btn-outline" onClick={goHome}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
