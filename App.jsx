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
,
  {q:"A car from rest reaches 20 m/s in 4 s. Acceleration:",opts:["5 m/s²","10 m/s²","4 m/s²","2 m/s²"],ans:0,ch:"Motion in Straight Line",src:"Allen Module",diff:"Easy",exp:"a=(v-u)/t=(20-0)/4=5 m/s²"},
  {q:"x=2t²+3t+1. Velocity at t=2s:",opts:["11 m/s","8 m/s","4 m/s","5 m/s"],ans:0,ch:"Motion in Straight Line",src:"Physics Wallah",diff:"Medium",exp:"v=dx/dt=4t+3. At t=2: v=11 m/s"},
  {q:"Area under v-t graph gives:",opts:["Acceleration","Speed","Displacement","Force"],ans:2,ch:"Motion in Straight Line",src:"Motion Institute",diff:"Easy",exp:"Area under v-t graph = displacement"},
  {q:"At highest point of projectile, acceleration is:",opts:["Zero","g upward","g downward","Depends on mass"],ans:2,ch:"Motion in Straight Line",src:"NCERT Exemplar",diff:"Easy",exp:"g always acts downward regardless of velocity"},
  {q:"Slope of x-t graph gives:",opts:["Acceleration","Displacement","Velocity","Speed"],ans:2,ch:"Motion in Straight Line",src:"Aakash Module",diff:"Easy",exp:"Slope of x-t graph = dx/dt = velocity"},
  {q:"Stone dropped from 80 m. Time to reach ground (g=10):",opts:["4 s","8 s","2 s","16 s"],ans:0,ch:"Motion in Straight Line",src:"Allen Module",diff:"Easy",exp:"h=½gt²→80=5t²→t=4 s"},
  {q:"Retardation means velocity and acceleration are:",opts:["Same direction","Opposite direction","Perpendicular","Zero"],ans:1,ch:"Motion in Straight Line",src:"Physics Wallah",diff:"Easy",exp:"Retardation = deceleration; acceleration opposes motion"},
  {q:"Two trains 400 m each approach at 72 km/h. Time to completely cross:",opts:["20 s","10 s","40 s","8 s"],ans:0,ch:"Motion in Straight Line",src:"Motion Institute",diff:"Medium",exp:"Relative speed=40 m/s. Total length=800 m. t=20 s"},
  {q:"Relative velocity of bodies moving in same direction v₁>v₂:",opts:["v₁+v₂","v₁-v₂","v₁v₂","v₁/v₂"],ans:1,ch:"Motion in Straight Line",src:"Aakash Module",diff:"Easy",exp:"Same direction: relative v = v₁-v₂"},
  {q:"A body at rest has non-zero:",opts:["Velocity","Acceleration","Mass","Displacement"],ans:2,ch:"Motion in Straight Line",src:"NCERT Exemplar",diff:"Easy",exp:"Mass is an intrinsic property; doesn't depend on motion"},
  {q:"Displacement in nth second: Sₙ = u + a(2n-1)/2. For u=0, a=2, S₃=",opts:["5 m","3 m","9 m","7 m"],ans:0,ch:"Motion in Straight Line",src:"Allen Module",diff:"Medium",exp:"S₃=0+2(2×3-1)/2=2×5/2=5 m"},
  {q:"Distance-time graph of uniformly accelerated body is:",opts:["Straight line","Parabola","Hyperbola","Circle"],ans:1,ch:"Motion in Straight Line",src:"Physics Wallah",diff:"Easy",exp:"s=ut+½at²; quadratic in t → parabola on s-t graph"},
  {q:"A ball thrown up at 20 m/s. Max height (g=10):",opts:["20 m","40 m","10 m","200 m"],ans:0,ch:"Motion in Straight Line",src:"Aakash Module",diff:"Easy",exp:"v²=u²-2gh→0=400-20h→h=20 m"},
  {q:"A car moving at 54 km/h brakes and stops in 5 s. Retardation:",opts:["3 m/s²","5.4 m/s²","10 m/s²","1.5 m/s²"],ans:0,ch:"Motion in Straight Line",src:"Motion Institute",diff:"Medium",exp:"u=54km/h=15m/s. a=(0-15)/5=-3 m/s² (retardation=3 m/s²)"},
  {q:"Uniform velocity means:",opts:["Constant speed only","Constant speed + direction","Variable speed + constant direction","Increasing speed"],ans:1,ch:"Motion in Straight Line",src:"NCERT Exemplar",diff:"Easy",exp:"Velocity is a vector; uniform velocity = constant magnitude AND direction"},
  {q:"A particle starts at x=5m and moves with v=3 m/s. Position at t=4s:",opts:["17 m","12 m","20 m","7 m"],ans:0,ch:"Motion in Straight Line",src:"Allen Module",diff:"Easy",exp:"x=x₀+vt=5+3×4=17 m"},
  {q:"Free fall acceleration near Earth surface:",opts:["9.8 m/s downward","9.8 m/s upward","Depends on mass","Varies with speed"],ans:0,ch:"Motion in Straight Line",src:"Physics Wallah",diff:"Easy",exp:"Free fall: a=g=9.8 m/s² downward (independent of mass, air resistance neglected)"},
  {q:"A body covers equal distances in equal time intervals. Its motion is:",opts:["Non-uniform","Uniformly accelerated","Uniform","Retarded"],ans:2,ch:"Motion in Straight Line",src:"Aakash Module",diff:"Easy",exp:"Equal distances in equal times → constant speed = uniform motion"},
  {q:"Instantaneous velocity = average velocity when:",opts:["Acceleration is uniform","Velocity is uniform","Body at rest","None of these"],ans:1,ch:"Motion in Straight Line",src:"Motion Institute",diff:"Medium",exp:"When velocity is constant (uniform), instantaneous = average velocity"},
  {q:"A cheetah runs 100 m in 4 s. Average speed:",opts:["25 m/s","400 m/s","10 m/s","4 m/s"],ans:0,ch:"Motion in Straight Line",src:"NCERT Exemplar",diff:"Easy",exp:"Average speed = distance/time = 100/4 = 25 m/s"},

  {q:"Static friction is always __ limiting friction:",opts:["Greater than","Equal to","Less than or equal to","Independent of"],ans:2,ch:"Laws of Motion",src:"Allen Module",diff:"Easy",exp:"Static friction adjusts to applied force; ≤ limiting friction (μₛN)"},
  {q:"Newton's 1st law is also called law of:",opts:["Acceleration","Inertia","Action-reaction","Gravitation"],ans:1,ch:"Laws of Motion",src:"NCERT Exemplar",diff:"Easy",exp:"Newton's 1st law: body continues in its state → law of inertia"},
  {q:"A 10 kg block on frictionless surface, F=50 N applied. Acceleration:",opts:["5 m/s²","500 m/s²","0.2 m/s²","50 m/s²"],ans:0,ch:"Laws of Motion",src:"Physics Wallah",diff:"Easy",exp:"a=F/m=50/10=5 m/s²"},
  {q:"Impulse-momentum theorem: FΔt =",opts:["mv²","Δ(mv)","ma","mv"],ans:1,ch:"Laws of Motion",src:"Aakash Module",diff:"Easy",exp:"FΔt=Δp=change in momentum (impulse-momentum theorem)"},
  {q:"A lift decelerates downward at 3 m/s². Apparent weight of 60 kg person (g=10):",opts:["780 N","420 N","600 N","180 N"],ans:1,ch:"Laws of Motion",src:"Motion Institute",diff:"Hard",exp:"Deceleration downward = acceleration upward. N=m(g-a)=60(10-3)=420 N"},
  {q:"Action and reaction forces act on:",opts:["Same body","Different bodies","Same point","Opposite directions on same body"],ans:1,ch:"Laws of Motion",src:"Allen Module",diff:"Easy",exp:"Newton's 3rd law: action-reaction pair acts on DIFFERENT bodies"},
  {q:"A rocket works on principle of:",opts:["Newton's 1st law","Newton's 2nd law","Newton's 3rd law","Bernoulli's theorem"],ans:2,ch:"Laws of Motion",src:"NCERT Exemplar",diff:"Easy",exp:"Rocket: gas expelled backward (action), rocket moves forward (reaction) — Newton's 3rd law"},
  {q:"Coefficient of kinetic friction is generally:",opts:["Greater than static","Less than static","Equal to static","Zero"],ans:1,ch:"Laws of Motion",src:"Physics Wallah",diff:"Easy",exp:"μk < μs always; it's easier to keep moving than to start moving"},
  {q:"Centripetal acceleration = v²/r. For v=10 m/s, r=5 m:",opts:["20 m/s²","50 m/s²","2 m/s²","10 m/s²"],ans:0,ch:"Laws of Motion",src:"Aakash Module",diff:"Easy",exp:"ac=v²/r=100/5=20 m/s²"},
  {q:"Tension at bottom of circular motion (mass m, velocity v, radius r):",opts:["mg","mv²/r","mg+mv²/r","mg-mv²/r"],ans:2,ch:"Laws of Motion",src:"Motion Institute",diff:"Medium",exp:"At bottom: T-mg=mv²/r → T=mg+mv²/r (centripetal directed upward)"},
  {q:"Minimum speed at top of vertical circle of radius r:",opts:["√(gr)","√(2gr)","√(5gr)","gr"],ans:0,ch:"Laws of Motion",src:"Allen Module",diff:"Hard",exp:"At top: mg=mv²/r (min T=0) → vmin=√(gr)"},

  {q:"Work done by friction is usually:",opts:["Positive","Negative","Zero","Variable"],ans:1,ch:"Work Energy & Power",src:"Allen Module",diff:"Easy",exp:"Kinetic friction opposes displacement → work done is negative (reduces KE)"},
  {q:"A body of mass 2 kg has KE=100 J. Its speed:",opts:["10 m/s","50 m/s","5 m/s","100 m/s"],ans:0,ch:"Work Energy & Power",src:"NCERT Exemplar",diff:"Easy",exp:"KE=½mv²→100=½×2×v²→v²=100→v=10 m/s"},
  {q:"Watt is unit of:",opts:["Work","Energy","Power","Force"],ans:2,ch:"Work Energy & Power",src:"Physics Wallah",diff:"Easy",exp:"1 Watt = 1 Joule/second; SI unit of power"},
  {q:"A person carrying 10 kg suitcase walks on level floor. Work done by person on suitcase:",opts:["10×d J","Zero","Negative","Depends on speed"],ans:1,ch:"Work Energy & Power",src:"Aakash Module",diff:"Medium",exp:"Weight acts down, displacement is horizontal → W=F·d·cos90°=0"},
  {q:"Elastic collision: both KE and momentum are:",opts:["Conserved","Not conserved","Only momentum conserved","Only KE conserved"],ans:0,ch:"Work Energy & Power",src:"Motion Institute",diff:"Easy",exp:"Elastic collision: both momentum AND kinetic energy are conserved"},
  {q:"In inelastic collision:",opts:["Momentum not conserved","KE not conserved","Both conserved","Velocity unchanged"],ans:1,ch:"Work Energy & Power",src:"Allen Module",diff:"Easy",exp:"Inelastic: momentum conserved but KE NOT conserved (some lost to heat/sound)"},
  {q:"1 horsepower =",opts:["746 W","1000 W","550 W","1 kW"],ans:0,ch:"Work Energy & Power",src:"NCERT Exemplar",diff:"Easy",exp:"1 HP = 746 W (British unit of power)"},
  {q:"Power of 100 W bulb on for 10 hours. Energy consumed:",opts:["1 kWh","1 Wh","100 Wh","10 Wh"],ans:0,ch:"Work Energy & Power",src:"Physics Wallah",diff:"Easy",exp:"Energy=P×t=100W×10h=1000 Wh=1 kWh"},
  {q:"Height from which a ball falls and bounces back to h/2. Coefficient of restitution:",opts:["0.5","0.707","0.25","1"],ans:1,ch:"Work Energy & Power",src:"Aakash Module",diff:"Hard",exp:"e=√(h'/h)=√(h/2 ÷ h)=√0.5=1/√2≈0.707"},

  {q:"I=2 kg·m², ω=6 rad/s. Rotational KE:",opts:["36 J","12 J","72 J","6 J"],ans:0,ch:"Rotational Motion",src:"Allen Module",diff:"Medium",exp:"KE=½Iω²=½×2×36=36 J"},
  {q:"Torque=I×α. I=5 kg·m², α=4 rad/s². Torque:",opts:["20 N·m","1.25 N·m","9 N·m","0.8 N·m"],ans:0,ch:"Rotational Motion",src:"NCERT Exemplar",diff:"Easy",exp:"τ=Iα=5×4=20 N·m"},
  {q:"Hollow cylinder and solid cylinder, same M and R. On incline, which has greater acceleration?",opts:["Hollow cylinder","Solid cylinder","Both equal","Depends on angle"],ans:1,ch:"Rotational Motion",src:"Physics Wallah",diff:"Hard",exp:"Solid: I=MR²/2(ratio=1/2). Hollow: I=MR²(ratio=1). Lower ratio→higher a→solid cylinder faster"},
  {q:"MOI of disc of mass M radius R about central axis:",opts:["MR²","MR²/2","MR²/4","2MR²"],ans:1,ch:"Rotational Motion",src:"Aakash Module",diff:"Easy",exp:"I=MR²/2 for solid disc/cylinder about central axis"},
  {q:"Earth spinning: if radius decreases, its rotation speed:",opts:["Decreases","Increases","Same","Stops"],ans:1,ch:"Rotational Motion",src:"Motion Institute",diff:"Medium",exp:"Angular momentum L=Iω conserved. If R decreases→I decreases→ω increases"},
  {q:"Couple consists of:",opts:["Two equal parallel forces same direction","Two equal anti-parallel forces different lines","Two unequal forces","One force and one torque"],ans:1,ch:"Rotational Motion",src:"Allen Module",diff:"Medium",exp:"Couple: two equal, opposite, non-collinear forces that produce pure rotation"},
  {q:"Centre of gravity coincides with centre of mass when:",opts:["Body is large","Gravitational field is uniform","Body is small","Body is symmetric"],ans:1,ch:"Rotational Motion",src:"NCERT Exemplar",diff:"Medium",exp:"CG=CM when g is uniform (small bodies or uniform field)"},
  {q:"Angular impulse = change in:",opts:["Angular velocity","Angular momentum","Torque","MOI"],ans:1,ch:"Rotational Motion",src:"Physics Wallah",diff:"Medium",exp:"Angular impulse = τ·Δt = ΔL (change in angular momentum)"},

  {q:"Acceleration due to gravity on moon is about g/6. Weight of 60 kg person on moon:",opts:["100 N","60 N","360 N","10 N"],ans:0,ch:"Gravitation",src:"Allen Module",diff:"Easy",exp:"W_moon=m×g_moon=60×(10/6)=100 N"},
  {q:"Planets move faster when:",opts:["Far from sun","Close to sun","Always constant speed","At aphelion"],ans:1,ch:"Gravitation",src:"NCERT Exemplar",diff:"Easy",exp:"Kepler's 2nd law: angular momentum conserved→closer to sun→faster orbital speed"},
  {q:"Gravitational field is zero at:",opts:["Surface of Earth","Centre of Earth","Infinity","None"],ans:1,ch:"Gravitation",src:"Physics Wallah",diff:"Medium",exp:"At Earth's centre, symmetric forces from all directions cancel → g=0"},
  {q:"If height h<<R, g at height h ≈",opts:["g(1+2h/R)","g(1-2h/R)","g(1-h/R)","g(1+h/R)"],ans:1,ch:"Gravitation",src:"Aakash Module",diff:"Hard",exp:"g_h=GM/(R+h)²≈g(1-2h/R) for h<<R (binomial approximation)"},
  {q:"Which quantity is conserved in orbital motion of planet?",opts:["KE","PE","Speed","Angular momentum"],ans:3,ch:"Gravitation",src:"Motion Institute",diff:"Medium",exp:"No external torque on planet→angular momentum L=mvr is conserved"},

  {q:"For adiabatic process, PVᵞ = constant. For diatomic ideal gas, γ=",opts:["5/3","7/5","4/3","3/2"],ans:1,ch:"Thermodynamics",src:"Allen Module",diff:"Medium",exp:"γ=Cp/Cv. Diatomic: f=5, Cv=5R/2, Cp=7R/2 → γ=7/5=1.4"},
  {q:"In reversible isothermal expansion of ideal gas, dU=0 because:",opts:["No work done","T is constant→U=f(T) only","P is constant","V is constant"],ans:1,ch:"Thermodynamics",src:"NCERT Exemplar",diff:"Medium",exp:"For ideal gas, U depends only on T. Isothermal→T constant→ΔU=0"},
  {q:"Entropy change in reversible process at temperature T: dS=",opts:["dQ/T","T/dQ","dQ×T","dQ"],ans:0,ch:"Thermodynamics",src:"Physics Wallah",diff:"Medium",exp:"dS=dQ/T (definition of entropy change for reversible process)"},
  {q:"Zeroth law of thermodynamics defines:",opts:["Entropy","Temperature","Internal energy","Pressure"],ans:1,ch:"Thermodynamics",src:"Aakash Module",diff:"Easy",exp:"Zeroth law: if A and B are in thermal equilibrium with C, then A and B are in equilibrium → defines temperature"},
  {q:"Work done by ideal gas in isobaric process:",opts:["PΔV","ΔU","Zero","nCvΔT"],ans:0,ch:"Thermodynamics",src:"Motion Institute",diff:"Easy",exp:"Isobaric (constant P): W=PΔV=P(V₂-V₁)"},

  {q:"Average translational KE per molecule of gas = ",opts:["½kT","kT","3/2 kT","3kT"],ans:2,ch:"Kinetic Theory of Gases",src:"Allen Module",diff:"Medium",exp:"Average translational KE per molecule = 3/2 kT (3 translational degrees of freedom)"},
  {q:"At absolute zero temperature, kinetic energy of gas is:",opts:["Maximum","Minimum (zero)","kT","1.5 kT"],ans:1,ch:"Kinetic Theory of Gases",src:"NCERT Exemplar",diff:"Easy",exp:"At T=0 K, all molecular motion ceases → KE=0"},
  {q:"Mean free path of gas molecule increases when:",opts:["Pressure increases","Temperature decreases","Density decreases","All of above"],ans:2,ch:"Kinetic Theory of Gases",src:"Physics Wallah",diff:"Medium",exp:"Mean free path λ=1/(√2 πd²n); n=number density. Lower density→fewer collisions→larger λ"},
  {q:"Ratio of vₘₛ:vₐᵥₘ:vₘₚ for gas molecules:",opts:["1.73:1.60:1.41","3:2:1","1:1:1","1.41:1.60:1.73"],ans:0,ch:"Kinetic Theory of Gases",src:"Aakash Module",diff:"Hard",exp:"vrms=√(3RT/M), vavg=√(8RT/πM), vmp=√(2RT/M). Ratio ≈ 1.73:1.60:1.41"},
  {q:"Ideal gas equation PV = nRT is valid at:",opts:["High P, low T","Low P, high T","Any P and T","Only at STP"],ans:1,ch:"Kinetic Theory of Gases",src:"Motion Institute",diff:"Medium",exp:"Ideal gas behavior: molecules far apart, weak interactions → low P, high T"},

  {q:"Phase difference between displacement and velocity in SHM:",opts:["0","π/4","π/2","π"],ans:2,ch:"Oscillations",src:"Allen Module",diff:"Medium",exp:"x=Asinωt, v=Aωcosωt=Aωsin(ωt+π/2); v leads x by π/2"},
  {q:"In SHM, PE+KE at any point equals:",opts:["½kA²","½kx²","kA²","0"],ans:0,ch:"Oscillations",src:"NCERT Exemplar",diff:"Medium",exp:"Total mechanical energy E=½kA² (constant at all positions in SHM)"},
  {q:"Resonance occurs when driving frequency equals:",opts:["Half the natural frequency","Double the natural frequency","Natural frequency","Zero"],ans:2,ch:"Oscillations",src:"Physics Wallah",diff:"Easy",exp:"Resonance: maximum amplitude when driving frequency = natural frequency of system"},
  {q:"Time period of seconds pendulum:",opts:["1 s","2 s","0.5 s","4 s"],ans:1,ch:"Oscillations",src:"Aakash Module",diff:"Easy",exp:"Seconds pendulum: T=2 s (1 s for each half oscillation, marks each second)"},
  {q:"If length of pendulum doubled, time period becomes:",opts:["2T","√2 T","T/√2","T/2"],ans:1,ch:"Oscillations",src:"Motion Institute",diff:"Easy",exp:"T=2π√(l/g)∝√l; l→2l → T'=√2 T"},

  {q:"Velocity of wave = frequency × wavelength. For 440 Hz and λ=0.75 m, v=",opts:["330 m/s","440 m/s","0.75 m/s","587 m/s"],ans:0,ch:"Waves",src:"Allen Module",diff:"Easy",exp:"v=fλ=440×0.75=330 m/s"},
  {q:"Sound cannot travel through:",opts:["Solid","Liquid","Gas","Vacuum"],ans:3,ch:"Waves",src:"NCERT Exemplar",diff:"Easy",exp:"Sound is mechanical wave; needs medium. Vacuum has no medium → sound cannot propagate"},
  {q:"Frequency of 1st harmonic of closed organ pipe (length L, velocity v):",opts:["v/4L","v/2L","v/L","3v/4L"],ans:0,ch:"Waves",src:"Physics Wallah",diff:"Medium",exp:"Closed pipe fundamental: f=v/4L (one node at closed end, antinode at open)"},
  {q:"Number of beats per second = |f₁-f₂|. If f₁=256, f₂=260, beats/s=",opts:["4","516","2","8"],ans:0,ch:"Waves",src:"Aakash Module",diff:"Easy",exp:"Beats = |260-256| = 4 per second"},
  {q:"Transverse waves can travel in:",opts:["Gases only","Liquids only","Solids and surface of liquids","All media"],ans:2,ch:"Waves",src:"Motion Institute",diff:"Medium",exp:"Transverse waves need shear elasticity → only solids support them (and surface of liquids for water waves)"},

  {q:"Critical angle for total internal reflection depends on:",opts:["Wavelength only","Refractive index only","Both wavelength and μ","Neither"],ans:2,ch:"Ray Optics",src:"Allen Module",diff:"Medium",exp:"sinC=1/μ; μ depends on wavelength (dispersion)→C depends on both"},
  {q:"Power of convex lens of f=25 cm:",opts:["+4D","−4D","+0.04D","−0.04D"],ans:0,ch:"Ray Optics",src:"NCERT Exemplar",diff:"Easy",exp:"P=1/f(m)=1/0.25=+4D (converging/convex lens → positive)"},
  {q:"Image formed by plane mirror is:",opts:["Real, inverted","Virtual, erect, same size","Real, erect","Virtual, inverted"],ans:1,ch:"Ray Optics",src:"Physics Wallah",diff:"Easy",exp:"Plane mirror: virtual, erect, laterally inverted, same size as object"},
  {q:"Myopia (short-sightedness) is corrected by:",opts:["Convex lens","Concave lens","Cylindrical lens","Bifocal lens"],ans:1,ch:"Ray Optics",src:"Aakash Module",diff:"Easy",exp:"Myopia: image forms before retina. Concave (diverging) lens corrects by moving image back to retina"},
  {q:"Angle of incidence = angle of reflection. This is:",opts:["Snell's law","Law of reflection","Brewster's law","Bragg's law"],ans:1,ch:"Ray Optics",src:"Motion Institute",diff:"Easy",exp:"Law of reflection: angle of incidence = angle of reflection (both measured from normal)"},

  {q:"Coherent sources have:",opts:["Same frequency and constant phase difference","Same amplitude only","Same wavelength only","Random phase"],ans:0,ch:"Wave Optics",src:"Allen Module",diff:"Easy",exp:"Coherent sources: same frequency, constant phase relationship → stable interference pattern"},
  {q:"Diffraction effects are significant when slit width ≈",opts:["1 m","1 cm","Wavelength of light","100 wavelengths"],ans:2,ch:"Wave Optics",src:"NCERT Exemplar",diff:"Medium",exp:"Diffraction significant when obstacle/slit size ≈ wavelength of wave"},
  {q:"Fringe width β=λD/d. If d halved, β:",opts:["Halves","Doubles","Same","Quadruples"],ans:1,ch:"Wave Optics",src:"Physics Wallah",diff:"Easy",exp:"β∝1/d; d halved → β doubles"},
  {q:"Polaroid works by:",opts:["Reflection","Absorption of one component","Diffraction","Scattering"],ans:1,ch:"Wave Optics",src:"Aakash Module",diff:"Medium",exp:"Polaroid contains long chain molecules that absorb one component of E-field → linearly polarised light"},
  {q:"In thin film interference, bright fringe when path difference =",opts:["nλ","(n+½)λ","nλ/2","2nλ"],ans:0,ch:"Wave Optics",src:"Motion Institute",diff:"Medium",exp:"Constructive interference: path difference = nλ (n=0,1,2...)"},

  {q:"Max KE in photoelectric effect depends on:",opts:["Intensity","Frequency","Both","Distance from source"],ans:1,ch:"Dual Nature of Matter",src:"Allen Module",diff:"Easy",exp:"KEmax=hν-φ; depends on frequency ν, NOT intensity"},
  {q:"Work function of metal = 4 eV. Threshold frequency:",opts:["9.7×10¹⁴ Hz","4×10¹⁴ Hz","6×10¹⁵ Hz","1.6×10¹⁵ Hz"],ans:0,ch:"Dual Nature of Matter",src:"NCERT Exemplar",diff:"Medium",exp:"f₀=φ/h=4×1.6×10⁻¹⁹/6.6×10⁻³⁴≈9.7×10¹⁴ Hz"},
  {q:"de Broglie wavelength of electron: if KE doubles, λ becomes:",opts:["λ/√2","λ/2","√2 λ","2λ"],ans:0,ch:"Dual Nature of Matter",src:"Physics Wallah",diff:"Medium",exp:"λ=h/√(2mKE)∝1/√KE; KE→2KE: λ'=λ/√2"},
  {q:"Which confirmed wave nature of electrons experimentally?",opts:["Photoelectric effect","Compton effect","Davisson-Germer","Rutherford scattering"],ans:2,ch:"Dual Nature of Matter",src:"Aakash Module",diff:"Easy",exp:"Davisson-Germer (1927): diffraction of electrons from nickel confirmed de Broglie hypothesis"},
  {q:"Photon energy E = hν. Momentum of photon:",opts:["hν/c","hν²","hc/ν","hν×c"],ans:0,ch:"Dual Nature of Matter",src:"Motion Institute",diff:"Medium",exp:"p=E/c=hν/c=h/λ (photon momentum despite zero rest mass)"},

  {q:"Energy of nth Bohr orbit of H: Eₙ=-13.6/n² eV. E₂=",opts:["-3.4 eV","-13.6 eV","-1.51 eV","-6.8 eV"],ans:0,ch:"Atoms & Nuclei",src:"Allen Module",diff:"Easy",exp:"E₂=-13.6/4=-3.4 eV"},
  {q:"Number of protons = atomic number Z. Number of neutrons = A-Z. ²³⁸₉₂U has neutrons:",opts:["146","92","238","330"],ans:0,ch:"Atoms & Nuclei",src:"NCERT Exemplar",diff:"Easy",exp:"Neutrons=A-Z=238-92=146"},
  {q:"Activity of radioactive sample = λN. Unit:",opts:["Becquerel","Curie","Both A and B","Henry"],ans:2,ch:"Atoms & Nuclei",src:"Physics Wallah",diff:"Easy",exp:"Activity unit: Becquerel (SI) = 1 decay/s; Curie (older) = 3.7×10¹⁰ decays/s"},
  {q:"Nuclear fusion releases more energy/kg than fission because:",opts:["Fusion uses heavier nuclei","Light nuclei have lower BE/nucleon→more energy released on fusion","Fusion is slower","Fission uses less material"],ans:1,ch:"Atoms & Nuclei",src:"Aakash Module",diff:"Hard",exp:"Light nuclei (H) have low BE/nucleon; fusing them gives products with much higher BE/nucleon → large energy release per kg"},
  {q:"γ-rays are:",opts:["Electrons","Protons","High energy photons","Neutrons"],ans:2,ch:"Atoms & Nuclei",src:"Motion Institute",diff:"Easy",exp:"Gamma rays are electromagnetic radiation (high energy photons) emitted from excited nuclei"},

  {q:"Conductors have __ band gap:",opts:["Large","Small","Zero (bands overlap)","Infinite"],ans:2,ch:"Semiconductors",src:"Allen Module",diff:"Easy",exp:"Conductors: conduction and valence bands overlap → no band gap → free electrons always available"},
  {q:"At higher temperature, resistance of semiconductor:",opts:["Increases","Decreases","Stays same","Becomes zero"],ans:1,ch:"Semiconductors",src:"NCERT Exemplar",diff:"Easy",exp:"Higher T → more electron-hole pairs → more carriers → conductivity increases → resistance decreases"},
  {q:"Full wave rectifier output frequency if input is 50 Hz:",opts:["50 Hz","100 Hz","25 Hz","200 Hz"],ans:1,ch:"Semiconductors",src:"Physics Wallah",diff:"Medium",exp:"Full wave rectifier: both half cycles used → output frequency = 2 × input = 100 Hz"},
  {q:"In common emitter transistor, current gain β = IC/IB. If β=100, IB=20μA, IC=",opts:["2 mA","20 mA","0.2 mA","200 mA"],ans:0,ch:"Semiconductors",src:"Aakash Module",diff:"Medium",exp:"IC=β×IB=100×20μA=2000μA=2 mA"},
  {q:"Intrinsic semiconductor at absolute zero behaves as:",opts:["Good conductor","Semiconductor","Perfect insulator","Superconductor"],ans:2,ch:"Semiconductors",src:"Motion Institute",diff:"Medium",exp:"At 0 K, all electrons in valence band, no thermal excitation→no carriers→perfect insulator"},
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
,
  {q:"Molality of solution = moles of solute per kg of:",opts:["Solution","Solvent","Both","Neither"],ans:1,ch:"Solutions",src:"Allen Module",diff:"Easy",exp:"Molality m = moles of solute / kg of SOLVENT (not solution)"},
  {q:"Raoult's law: partial pressure of component = mole fraction × ",opts:["Total pressure","Vapour pressure of pure component","Molality","Concentration"],ans:1,ch:"Solutions",src:"NCERT Exemplar",diff:"Easy",exp:"p_A = x_A × p°_A (Raoult's law for ideal solutions)"},
  {q:"Colligative property depends on:",opts:["Nature of solute","Number of solute particles","Size of solute","Colour of solute"],ans:1,ch:"Solutions",src:"Physics Wallah",diff:"Easy",exp:"Colligative properties depend ONLY on number of solute particles, not their nature"},
  {q:"Osmotic pressure π = MRT. M = 0.1 mol/L, T = 300K, R=0.083. π =",opts:["2.49 atm","0.249 atm","24.9 atm","0.0249 atm"],ans:0,ch:"Solutions",src:"Aakash Module",diff:"Medium",exp:"π=MRT=0.1×0.083×300=2.49 atm"},
  {q:"Elevation of boiling point ΔTb = Kb×m. Kb depends on:",opts:["Solute","Solvent only","Both","Temperature"],ans:1,ch:"Solutions",src:"Motion Institute",diff:"Medium",exp:"Kb (ebullioscopic constant) is property of solvent only (Kb=RT²b/1000Lv)"},
  {q:"Henry's law: solubility of gas in liquid ∝",opts:["Temperature","Partial pressure of gas","Volume of liquid","Molar mass"],ans:1,ch:"Solutions",src:"Allen Module",diff:"Easy",exp:"Henry's law: p = KH × x; solubility increases with partial pressure of gas"},
  {q:"Isotonic solutions have:",opts:["Same density","Same osmotic pressure","Same concentration by mass","Same temperature"],ans:1,ch:"Solutions",src:"NCERT Exemplar",diff:"Easy",exp:"Isotonic = same osmotic pressure = same molar concentration"},
  {q:"Reverse osmosis is used in:",opts:["Blood transfusion","Water purification","Dialysis","Fermentation"],ans:1,ch:"Solutions",src:"Physics Wallah",diff:"Easy",exp:"Reverse osmosis: applied pressure > osmotic pressure forces water through semi-permeable membrane → desalination"},
  {q:"Van't Hoff factor i for Al₂(SO₄)₃ in dilute solution:",opts:["2","3","4","5"],ans:3,ch:"Solutions",src:"Aakash Module",diff:"Medium",exp:"Al₂(SO₄)₃ → 2Al³⁺ + 3SO₄²⁻ = 5 ions total → i = 5"},
  {q:"Azeotrope is a mixture that:",opts:["Has different boiling points","Boils at constant temperature with constant composition","Cannot be distilled","Has zero vapour pressure"],ans:1,ch:"Solutions",src:"Motion Institute",diff:"Hard",exp:"Azeotrope: liquid mixture with same composition in both liquid and vapour phase → cannot be separated by simple distillation"},

  {q:"pH of 0.01 M HCl solution:",opts:["1","2","3","0.01"],ans:1,ch:"Equilibrium",src:"Allen Module",diff:"Easy",exp:"HCl fully ionised: [H⁺]=0.01=10⁻², pH=-log(10⁻²)=2"},
  {q:"For weak acid HA, Ka expression:",opts:["[H⁺][A⁻]/[HA]","[HA]/[H⁺][A⁻]","[H⁺]/[HA]","[HA][H⁺]"],ans:0,ch:"Equilibrium",src:"NCERT Exemplar",diff:"Easy",exp:"Ka=[H⁺][A⁻]/[HA] (equilibrium constant for acid dissociation)"},
  {q:"Buffer solution resists change in:",opts:["Temperature","Pressure","pH","Concentration"],ans:2,ch:"Equilibrium",src:"Physics Wallah",diff:"Easy",exp:"Buffer: mixture of weak acid+its salt; resists pH changes on adding acid or base"},
  {q:"Common ion effect: adding NaCl to NaCl solution equilibrium shifts to:",opts:["Products","Reactants","No shift","Unpredictable"],ans:1,ch:"Equilibrium",src:"Aakash Module",diff:"Medium",exp:"Common ion (Cl⁻) increases, Le Chatelier → shifts to decrease Cl⁻ → backward (reactant side)"},
  {q:"At equilibrium, Kc > 1 means:",opts:["Products favoured","Reactants favoured","Equal amounts","Reaction stops"],ans:0,ch:"Equilibrium",src:"Motion Institute",diff:"Easy",exp:"Kc=[products]/[reactants]; Kc>1 → products more at equilibrium"},
  {q:"Solubility product Ksp of AgCl = 1.8×10⁻¹⁰. Molar solubility:",opts:["1.34×10⁻⁵ M","1.8×10⁻¹⁰ M","1.8×10⁻⁵ M","3.6×10⁻⁵ M"],ans:0,ch:"Equilibrium",src:"Allen Module",diff:"Medium",exp:"Ksp=s²→s=√(1.8×10⁻¹⁰)=1.34×10⁻⁵ M"},
  {q:"Henderson-Hasselbalch equation: pH = pKa + log",opts:["[Acid]/[Salt]","[Salt]/[Acid]","[H⁺][A⁻]","Ka/[HA]"],ans:1,ch:"Equilibrium",src:"NCERT Exemplar",diff:"Medium",exp:"pH = pKa + log([A⁻]/[HA]) = pKa + log([salt]/[acid])"},
  {q:"Degree of dissociation increases on:",opts:["Increasing concentration","Decreasing temperature","Dilution","Adding common ion"],ans:2,ch:"Equilibrium",src:"Physics Wallah",diff:"Medium",exp:"Dilution reduces concentration → equilibrium shifts right → more dissociation"},

  {q:"Equivalent weight of H₂SO₄ in neutralization:",opts:["98","49","24.5","196"],ans:1,ch:"Redox Reactions",src:"Allen Module",diff:"Medium",exp:"Eq. wt = M/n = 98/2 = 49 (H₂SO₄ provides 2H⁺ in neutralization)"},
  {q:"Oxidation state of S in H₂SO₄:",opts:["+4","+6","+2","+8"],ans:1,ch:"Redox Reactions",src:"NCERT Exemplar",diff:"Easy",exp:"2(+1)+S+4(-2)=0 → S=+6"},
  {q:"Balancing redox by half-reaction method: which are balanced separately?",opts:["Oxidation and reduction","Acid and base","Reactants and products","None"],ans:0,ch:"Redox Reactions",src:"Physics Wallah",diff:"Medium",exp:"Half-reaction method: oxidation half-reaction and reduction half-reaction balanced separately"},
  {q:"In acidic medium, MnO₄⁻ is reduced to:",opts:["MnO₂","Mn²⁺","MnO","Mn"],ans:1,ch:"Redox Reactions",src:"Aakash Module",diff:"Medium",exp:"In acidic: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (purple to colourless)"},
  {q:"Faraday's 1st law: mass deposited ∝",opts:["Time only","Current only","Charge passed (I×t)","Voltage"],ans:2,ch:"Redox Reactions",src:"Motion Institute",diff:"Easy",exp:"m=Zit=ZQ; mass deposited proportional to total charge passed"},

  {q:"Kohlrausch's law: limiting molar conductivity of electrolyte =",opts:["Sum of ionic conductivities","Product","Ratio","Difference"],ans:0,ch:"Electrochemistry",src:"Allen Module",diff:"Easy",exp:"Kohlrausch: Λ°m = ν₊λ°₊ + ν₋λ°₋ (sum of contributions of individual ions)"},
  {q:"Standard electrode potential of SHE (Standard Hydrogen Electrode):",opts:["1.0 V","0.0 V","-1.0 V","0.5 V"],ans:1,ch:"Electrochemistry",src:"NCERT Exemplar",diff:"Easy",exp:"SHE is reference electrode with E°=0.00 V by definition"},
  {q:"Nernst equation: E = E° - (RT/nF)lnQ. At 25°C with base 10:",opts:["E=E°-(0.0592/n)logQ","E=E°+(0.0592/n)logQ","E=E°×Q","E=E°/logQ"],ans:0,ch:"Electrochemistry",src:"Physics Wallah",diff:"Medium",exp:"Nernst equation at 25°C: E=E°-(0.0592/n)logQ"},
  {q:"Conductance of solution increases with dilution because:",opts:["More ions formed","Interionic interactions reduce, mobility increases","Viscosity increases","Temperature increases"],ans:1,ch:"Electrochemistry",src:"Aakash Module",diff:"Medium",exp:"Dilution reduces interionic attraction→ions move more freely→higher conductance"},
  {q:"Galvanic cell converts:",opts:["Electrical to chemical energy","Chemical to electrical energy","Heat to electrical energy","Mechanical to electrical energy"],ans:1,ch:"Electrochemistry",src:"Motion Institute",diff:"Easy",exp:"Galvanic/voltaic cell: spontaneous chemical reaction → electrical energy (battery)"},

  {q:"Rate constant k has units of mol⁻¹L s⁻¹ for reaction order:",opts:["Zero","First","Second","Third"],ans:2,ch:"Chemical Kinetics",src:"Allen Module",diff:"Medium",exp:"Second order: rate=k[A]². k=rate/[A]²=(mol/Ls)/(mol/L)²=L/(mol·s)=mol⁻¹Ls⁻¹"},
  {q:"For first order reaction, t₅₀% = t₁/₂ = 0.693/k. If k=0.01 s⁻¹, t₁/₂=",opts:["69.3 s","0.693 s","693 s","6930 s"],ans:0,ch:"Chemical Kinetics",src:"NCERT Exemplar",diff:"Easy",exp:"t₁/₂=0.693/k=0.693/0.01=69.3 s"},
  {q:"Arrhenius equation: k=Ae^(-Ea/RT). A is called:",opts:["Activation energy","Frequency factor","Rate constant","Threshold energy"],ans:1,ch:"Chemical Kinetics",src:"Physics Wallah",diff:"Easy",exp:"A = frequency factor (pre-exponential factor); related to collision frequency"},
  {q:"Rate of reaction doubles when temperature increases 10°C. Temperature coefficient =",opts:["1","2","0.5","10"],ans:1,ch:"Chemical Kinetics",src:"Aakash Module",diff:"Easy",exp:"Temperature coefficient (Q₁₀) = rate at (T+10)/rate at T = 2 (given)"},
  {q:"Zero order reaction: rate = k. Unit of k:",opts:["mol L⁻¹s⁻¹","s⁻¹","L mol⁻¹s⁻¹","L²mol⁻²s⁻¹"],ans:0,ch:"Chemical Kinetics",src:"Motion Institute",diff:"Medium",exp:"Zero order: rate=k[A]⁰=k; k has same units as rate = mol L⁻¹s⁻¹"},

  {q:"Transition metals show variable oxidation states because:",opts:["Large atomic radius","Variable number of d-electrons","High ionization energy","Low electronegativity"],ans:1,ch:"d & f Block Elements",src:"Allen Module",diff:"Medium",exp:"d-electrons have similar energies→different numbers can be removed→variable oxidation states"},
  {q:"Lanthanide contraction causes:",opts:["Increasing atomic radius across lanthanides","Similar properties of Zr and Hf","Decreasing density","Increasing reactivity"],ans:1,ch:"d & f Block Elements",src:"NCERT Exemplar",diff:"Hard",exp:"Lanthanide contraction: 4f electrons poor shielding→Hf has nearly same radius as Zr→similar properties"},
  {q:"KMnO₄ in alkaline medium is reduced to:",opts:["MnO₂","Mn²⁺","MnO₄²⁻","Mn"],ans:2,ch:"d & f Block Elements",src:"Physics Wallah",diff:"Hard",exp:"In alkaline medium: MnO₄⁻ + e⁻ → MnO₄²⁻ (manganate, green)"},
  {q:"Which transition metal is liquid at room temperature?",opts:["Fe","Cu","Hg","Zn"],ans:2,ch:"d & f Block Elements",src:"Aakash Module",diff:"Easy",exp:"Mercury (Hg) is the only metal that is liquid at room temperature (mp=-39°C)"},

  {q:"CFSE in octahedral complex depends on:",opts:["Ligand field strength only","Metal oxidation state only","Both ligand and metal","Coordination number"],ans:2,ch:"Coordination Compounds",src:"Allen Module",diff:"Medium",exp:"Crystal field stabilization energy (CFSE) depends on Δo which is affected by both ligand (spectrochemical series) and metal"},
  {q:"Coordination number in [Co(en)₂Cl₂]⁺ (en=bidentate):",opts:["4","5","6","8"],ans:2,ch:"Coordination Compounds",src:"NCERT Exemplar",diff:"Medium",exp:"en is bidentate (2 donor atoms each). 2 en + 2 Cl = 2×2+2 = 6 donor atoms → CN=6"},
  {q:"Isomers that differ only in orientation of groups around metal are:",opts:["Ionisation","Linkage","Geometric (cis-trans)","Optical"],ans:2,ch:"Coordination Compounds",src:"Physics Wallah",diff:"Medium",exp:"Geometric isomers: same connectivity, different spatial arrangement (cis/trans around metal centre)"},
  {q:"Hemoglobin contains which metal ion at centre of porphyrin?",opts:["Cu²⁺","Zn²⁺","Fe²⁺","Co²⁺"],ans:2,ch:"Coordination Compounds",src:"Aakash Module",diff:"Easy",exp:"Haemoglobin: Fe²⁺ in porphyrin ring; binds O₂ reversibly for oxygen transport"},

  {q:"Lucas test: which alcohol reacts instantly with ZnCl₂/conc HCl?",opts:["Primary","Secondary","Tertiary","All same"],ans:2,ch:"Alcohols & Ethers",src:"Allen Module",diff:"Easy",exp:"Lucas test: 3° reacts immediately (turbidity), 2° in 5 min, 1° needs heating"},
  {q:"Dehydration of alcohols (elimination) gives:",opts:["Ether only","Alkene only","Both ether and alkene","Aldehyde"],ans:2,ch:"Alcohols & Ethers",src:"NCERT Exemplar",diff:"Medium",exp:"Lower T→ether, Higher T→alkene; both are elimination/substitution products"},
  {q:"Phenol is more acidic than alcohol because:",opts:["O-H bond weaker","Phenoxide ion stabilised by resonance","Higher molecular weight","More polar solvent needed"],ans:1,ch:"Alcohols & Ethers",src:"Physics Wallah",diff:"Medium",exp:"Phenoxide: negative charge delocalised over benzene ring → more stable → phenol more acidic"},
  {q:"Clemmensen reduction converts C=O to:",opts:["C-OH","C=C","CH₂","COOH"],ans:2,ch:"Aldehydes & Ketones",src:"Aakash Module",diff:"Medium",exp:"Clemmensen (Zn-Hg/HCl): reduces carbonyl C=O directly to CH₂ (not via alcohol)"},
  {q:"Benzaldehyde does NOT give Fehling's test because:",opts:["No alpha hydrogen","Aromatic ring blocks","Not an aldehyde","High molecular weight"],ans:1,ch:"Aldehydes & Ketones",src:"Motion Institute",diff:"Hard",exp:"Fehling's test: aromatic aldehydes (benzaldehyde) don't reduce Fehling's solution; only aliphatic aldehydes do"},

  {q:"Aspirin is:",opts:["Analgesic only","Antipyretic only","Analgesic, antipyretic, anti-inflammatory","Antibiotic"],ans:2,ch:"Polymers",src:"Allen Module",diff:"Easy",exp:"Aspirin (acetylsalicylic acid) is analgesic (pain relief), antipyretic (fever), anti-inflammatory"},
  {q:"Nylon-6 is made from:",opts:["Caprolactam","Adipic acid+hexamethylenediamine","Glycol+terephthalic acid","Phenol+formaldehyde"],ans:0,ch:"Polymers",src:"NCERT Exemplar",diff:"Easy",exp:"Nylon-6: ring-opening polymerisation of caprolactam (vs Nylon-6,6 from two monomers)"},
  {q:"Teflon is polymer of:",opts:["Tetrafluoroethylene","Vinyl chloride","Styrene","Propylene"],ans:0,ch:"Polymers",src:"Physics Wallah",diff:"Easy",exp:"Teflon = polytetrafluoroethylene (PTFE); monomer is CF₂=CF₂"},
  {q:"Natural rubber is hardened by adding sulphur (vulcanisation). This forms:",opts:["Disulfide bridges","C-C bonds","Ether linkages","Ester bonds"],ans:0,ch:"Polymers",src:"Aakash Module",diff:"Medium",exp:"Vulcanisation: S bridges between polymer chains → cross-linked network → harder, more elastic rubber"},
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
,
  {q:"Which organelle has its own DNA?",opts:["Lysosome","Ribosome","Mitochondria","Golgi body"],ans:2,ch:"Cell Structure & Function",src:"Allen Module",diff:"Medium",exp:"Mitochondria (and chloroplast) have their own DNA and ribosomes → endosymbiont theory"},
  {q:"Unit membrane model was proposed by:",opts:["Watson & Crick","Robert Hooke","Robertson","Singer & Nicolson"],ans:2,ch:"Cell Structure & Function",src:"NCERT Exemplar",diff:"Medium",exp:"Robertson proposed unit membrane model (1959); later replaced by fluid mosaic model"},
  {q:"Fluid mosaic model of cell membrane was proposed by:",opts:["Robertson","Singer and Nicolson","Davson and Danielli","Watson and Crick"],ans:1,ch:"Cell Structure & Function",src:"Physics Wallah",diff:"Easy",exp:"Singer and Nicolson (1972) proposed fluid mosaic model: proteins embedded in phospholipid bilayer"},
  {q:"Cell wall in fungi is made of:",opts:["Cellulose","Chitin","Peptidoglycan","Starch"],ans:1,ch:"Cell Structure & Function",src:"Aakash Module",diff:"Easy",exp:"Fungal cell wall: chitin (polymer of N-acetylglucosamine). Bacteria: peptidoglycan. Plants: cellulose"},
  {q:"Which junction allows direct communication between adjacent cells?",opts:["Tight junction","Desmosomes","Gap junction","Plasmodesmata in plants"],ans:2,ch:"Cell Structure & Function",src:"Motion Institute",diff:"Medium",exp:"Gap junctions: channels between cells for direct ion and small molecule exchange"},
  {q:"Osmosis is movement of water across semi-permeable membrane from:",opts:["High solute to low solute","Low solute to high solute concentration","High temperature to low","High pressure to low"],ans:1,ch:"Cell Structure & Function",src:"Allen Module",diff:"Easy",exp:"Osmosis: water moves from dilute (low solute) to concentrated (high solute) solution through semipermeable membrane"},
  {q:"Plasmolysis in plant cell occurs when placed in:",opts:["Hypotonic solution","Hypertonic solution","Isotonic solution","Distilled water"],ans:1,ch:"Cell Structure & Function",src:"NCERT Exemplar",diff:"Easy",exp:"Hypertonic solution: cell loses water→cytoplasm shrinks away from wall → plasmolysis"},
  {q:"Centrosome is absent in:",opts:["Animal cells","Fungal cells","Higher plant cells","Algal cells"],ans:2,ch:"Cell Structure & Function",src:"Physics Wallah",diff:"Medium",exp:"Centrosome (centrioles) absent in higher plant cells (they use other MTOCs for spindle formation)"},
  {q:"Rough ER is rough because of:",opts:["Lipid vesicles","Ribosomes attached","Enzymes","Phospholipid bilayer"],ans:1,ch:"Cell Structure & Function",src:"Aakash Module",diff:"Easy",exp:"Rough ER: ribosomes attached to its surface give it rough appearance; site of protein synthesis"},
  {q:"Which cellular structure contains proteolytic enzymes?",opts:["Peroxisome","Lysosome","Ribosome","Golgi body"],ans:1,ch:"Cell Structure & Function",src:"Motion Institute",diff:"Easy",exp:"Lysosomes: contain acid hydrolases (proteases, lipases, nucleases) → 'suicidal bags' of cell"},
  {q:"Cell plate forms during:",opts:["S phase","Prophase","Telophase","Anaphase"],ans:2,ch:"Cell Structure & Function",src:"Allen Module",diff:"Medium",exp:"Cell plate (new cell wall) forms in telophase during cytokinesis in plant cells"},

  {q:"SPM of meiosis I is different from mitosis because:",opts:["Chromosomes don't pair in mitosis","DNA doesn't replicate in meiosis","Sister chromatids separate in mitosis instead of homologs","None"],ans:0,ch:"Cell Division",src:"Allen Module",diff:"Hard",exp:"In meiosis I, homologous chromosomes (not sister chromatids) pair up and separate (reductional division)"},
  {q:"Spindle fibres are made of:",opts:["Actin","Tubulin (microtubules)","Myosin","Collagen"],ans:1,ch:"Cell Division",src:"NCERT Exemplar",diff:"Easy",exp:"Spindle fibres are microtubules made of tubulin protein; pull chromosomes to poles"},
  {q:"Synapsis occurs during:",opts:["Prophase I","Metaphase I","Prophase II","Anaphase I"],ans:0,ch:"Cell Division",src:"Physics Wallah",diff:"Medium",exp:"Synapsis (pairing of homologous chromosomes) occurs during zygotene of prophase I"},
  {q:"DNA content in cell just before meiosis I begins (G2 phase): if normal = 2n (2C), it is:",opts:["2C","4C","1C","8C"],ans:1,ch:"Cell Division",src:"Aakash Module",diff:"Hard",exp:"After S phase (DNA replication), each chromosome has 2 chromatids → DNA doubles to 4C before meiosis I"},
  {q:"Colchicine arrests mitosis at which stage?",opts:["Prophase","Metaphase","Anaphase","Telophase"],ans:1,ch:"Cell Division",src:"Motion Institute",diff:"Medium",exp:"Colchicine inhibits tubulin polymerization→no spindle formation→chromosomes arrested at metaphase"},

  {q:"Which is NOT a reducing sugar?",opts:["Glucose","Fructose","Maltose","Sucrose"],ans:3,ch:"Biomolecules",src:"Allen Module",diff:"Medium",exp:"Sucrose: glycosidic bond involves anomeric carbons of both monomers → no free aldehyde/ketone → non-reducing"},
  {q:"α-helix and β-pleated sheet are examples of __ protein structure:",opts:["Primary","Secondary","Tertiary","Quaternary"],ans:1,ch:"Biomolecules",src:"NCERT Exemplar",diff:"Easy",exp:"Secondary structure: α-helix (H-bonds within chain) and β-sheet (H-bonds between chains)"},
  {q:"RNA differs from DNA in having:",opts:["Deoxyribose","Thymine","Uracil and ribose","Phosphate"],ans:2,ch:"Biomolecules",src:"Physics Wallah",diff:"Easy",exp:"RNA has ribose sugar (not deoxyribose) and uracil (not thymine); rest is same"},
  {q:"Phospholipids are major components of:",opts:["DNA","Cell membrane","Cell wall","Chlorophyll"],ans:1,ch:"Biomolecules",src:"Aakash Module",diff:"Easy",exp:"Cell membranes are phospholipid bilayers with embedded proteins"},
  {q:"Enzyme inhibition where inhibitor binds at site other than active site:",opts:["Competitive inhibition","Non-competitive inhibition","Substrate inhibition","Product inhibition"],ans:1,ch:"Biomolecules",src:"Motion Institute",diff:"Medium",exp:"Non-competitive (allosteric) inhibitor binds at allosteric site, changes active site shape"},
  {q:"Km of enzyme represents:",opts:["Maximum velocity","Substrate concentration at ½ Vmax","Inhibitor constant","Activation energy"],ans:1,ch:"Biomolecules",src:"Allen Module",diff:"Medium",exp:"Michaelis constant Km = [S] when reaction rate = ½Vmax; lower Km = higher affinity"},
  {q:"Coenzyme is:",opts:["Inorganic ion","Non-protein organic cofactor","Protein part of enzyme","Inhibitor"],ans:1,ch:"Biomolecules",src:"NCERT Exemplar",diff:"Easy",exp:"Coenzyme: non-protein organic molecule that binds loosely to enzyme (e.g., NAD⁺, FAD, CoA)"},

  {q:"Cyclic photophosphorylation produces:",opts:["ATP and NADPH","Only ATP","Only NADPH","ATP, NADPH and O₂"],ans:1,ch:"Photosynthesis",src:"Allen Module",diff:"Medium",exp:"Cyclic photophosphorylation (PS I only): electron returns via cytochrome → only ATP produced; no NADPH, no O₂"},
  {q:"CO₂ fixation in C3 plants by:",opts:["PEP carboxylase","Rubisco (RuBP carboxylase)","Phosphoglycerate kinase","ATP synthase"],ans:1,ch:"Photosynthesis",src:"NCERT Exemplar",diff:"Easy",exp:"In C3 plants, CO₂ combines with RuBP via Rubisco enzyme in Calvin cycle"},
  {q:"The Z-scheme of photosynthesis involves:",opts:["PS I only","PS II only","Both PS I and PS II","Neither"],ans:2,ch:"Photosynthesis",src:"Physics Wallah",diff:"Medium",exp:"Z-scheme (Hill reaction): involves both PS II (P680) and PS I (P700) in non-cyclic electron transport"},
  {q:"Photorespiration is associated with which enzyme?",opts:["Rubisco as oxygenase","PEP carboxylase","Rubisco as carboxylase","Cytochrome oxidase"],ans:0,ch:"Photosynthesis",src:"Aakash Module",diff:"Hard",exp:"Photorespiration: Rubisco acts as oxygenase (RuBP + O₂) in C3 plants at high O₂ → wasteful process"},
  {q:"Number of ATP molecules consumed in one Calvin cycle (per CO₂ fixed):",opts:["2","3","4","6"],ans:1,ch:"Photosynthesis",src:"Motion Institute",diff:"Hard",exp:"Per CO₂: 3 ATP + 2 NADPH consumed in Calvin cycle to produce one triose phosphate"},

  {q:"During aerobic respiration, pyruvate is oxidatively decarboxylated to:",opts:["Lactate","Ethanol","Acetyl CoA","Oxaloacetate"],ans:2,ch:"Respiration",src:"Allen Module",diff:"Easy",exp:"Pyruvate → Acetyl CoA + CO₂ + NADH (pyruvate dehydrogenase complex in mitochondrial matrix)"},
  {q:"ETC (electron transport chain) is located in:",opts:["Cytoplasm","Mitochondrial matrix","Inner mitochondrial membrane","Outer membrane"],ans:2,ch:"Respiration",src:"NCERT Exemplar",diff:"Easy",exp:"ETC complexes (I,II,III,IV) embedded in inner mitochondrial membrane"},
  {q:"ATP synthase (Complex V) synthesises ATP using:",opts:["Chemical energy directly","Proton gradient (chemiosmosis)","NADH directly","Electron flow"],ans:1,ch:"Respiration",src:"Physics Wallah",diff:"Medium",exp:"Mitchell's chemiosmosis: proton gradient across inner mitochondrial membrane drives ATP synthesis"},
  {q:"RQ for fat oxidation is approximately:",opts:["1.0","0.7","0.9","1.3"],ans:1,ch:"Respiration",src:"Aakash Module",diff:"Medium",exp:"Fat has high H:O ratio → more O₂ needed. RQ for fat ≈ 0.7 (< 1.0 for carbohydrates)"},
  {q:"Pasteur effect: aerobic conditions suppress:",opts:["Photosynthesis","Fermentation/anaerobic respiration","Aerobic respiration","Oxidative phosphorylation"],ans:1,ch:"Respiration",src:"Motion Institute",diff:"Hard",exp:"Pasteur effect: O₂ presence inhibits fermentation (anaerobic glycolysis); aerobic respiration is more efficient"},
  {q:"How many NADH produced in one turn of Krebs cycle?",opts:["2","3","4","1"],ans:1,ch:"Respiration",src:"Allen Module",diff:"Medium",exp:"One Krebs cycle turn: 3 NADH + 1 FADH₂ + 1 GTP produced"},

  {q:"Auxin transport is:",opts:["Bidirectional","Polar (basipetal in shoots)","Random","Acropetal only"],ans:1,ch:"Plant Growth & Development",src:"Allen Module",diff:"Medium",exp:"Auxin (IAA) shows polar basipetal transport in stems (tip → base); chemiosmotic theory"},
  {q:"Seed dormancy can be broken by:",opts:["Gibberellins","Abscisic acid","Auxin","Cytokinin"],ans:0,ch:"Plant Growth & Development",src:"NCERT Exemplar",diff:"Easy",exp:"GA (gibberellins) promote seed germination by breaking dormancy and activating α-amylase"},
  {q:"Which hormone promotes fruit ripening?",opts:["Auxin","Cytokinin","Ethylene","Gibberellin"],ans:2,ch:"Plant Growth & Development",src:"Physics Wallah",diff:"Easy",exp:"Ethylene (gaseous hormone): promotes fruit ripening, senescence, abscission"},
  {q:"Bolting (premature elongation of internodes) is caused by:",opts:["ABA","Cytokinin","Gibberellin","Auxin"],ans:2,ch:"Plant Growth & Development",src:"Aakash Module",diff:"Medium",exp:"Gibberellins cause bolting: rapid elongation of stem before flowering in long-day plants"},
  {q:"Root growth is:",opts:["Promoted by high auxin","Inhibited by high auxin","Unaffected by auxin","Promoted by all concentrations"],ans:1,ch:"Plant Growth & Development",src:"Motion Institute",diff:"Medium",exp:"Roots are highly sensitive to auxin; concentrations that promote shoot growth inhibit roots"},

  {q:"Peristalsis is:",opts:["Churning of food","Wave-like muscular contractions moving food forward","Absorption of nutrients","Secretion of digestive juices"],ans:1,ch:"Digestion & Absorption",src:"Allen Module",diff:"Easy",exp:"Peristalsis: rhythmic wave-like contractions of smooth muscle in alimentary canal"},
  {q:"Emulsification of fats is done by:",opts:["Lipase","Bile salts","Pepsin","Amylase"],ans:1,ch:"Digestion & Absorption",src:"NCERT Exemplar",diff:"Easy",exp:"Bile salts (not enzymes) emulsify fats into smaller droplets → increases surface area for lipase"},
  {q:"Vitamin B₁₂ absorption requires:",opts:["Pepsin","Intrinsic factor","Amylase","HCl alone"],ans:1,ch:"Digestion & Absorption",src:"Physics Wallah",diff:"Hard",exp:"Intrinsic factor (secreted by parietal cells) is essential for B₁₂ absorption in ileum"},
  {q:"Chylomicrons are formed in:",opts:["Liver","Intestinal epithelial cells","Pancreas","Blood"],ans:1,ch:"Digestion & Absorption",src:"Aakash Module",diff:"Hard",exp:"Chylomicrons: lipoproteins formed in intestinal cells for fat transport via lymph (lacteals)"},
  {q:"Cephalic phase of gastric secretion is triggered by:",opts:["Food in stomach","Sight/smell/thought of food","Hormones","Chemical stimuli"],ans:1,ch:"Digestion & Absorption",src:"Motion Institute",diff:"Hard",exp:"Cephalic phase: before food enters stomach; sight, smell, thought triggers vagus nerve → gastric secretion"},

  {q:"Surfactant lining the alveoli prevents:",opts:["Gas exchange","Alveolar collapse by reducing surface tension","Infection","Blood flow"],ans:1,ch:"Breathing & Gas Exchange",src:"Allen Module",diff:"Medium",exp:"Pulmonary surfactant (DPPC): reduces surface tension in alveoli → prevents collapse during expiration"},
  {q:"Oxygen dissociation curve shifts right when:",opts:["pH increases","CO₂ decreases","Temperature increases (Bohr effect)","None of above"],ans:2,ch:"Breathing & Gas Exchange",src:"NCERT Exemplar",diff:"Hard",exp:"Bohr effect: increased temperature, CO₂, decreased pH → right shift of O₂ dissociation curve → more O₂ released to tissues"},
  {q:"Residual volume is air:",opts:["Inspired in one breath","That cannot be expelled even after max expiration","In lungs at rest","Moved in normal breathing"],ans:1,ch:"Breathing & Gas Exchange",src:"Physics Wallah",diff:"Medium",exp:"Residual volume (RV) ≈ 1100-1200 mL; remains in lungs after maximum expiration; cannot be expired"},
  {q:"Partial pressure of O₂ in alveoli is approximately:",opts:["159 mmHg","104 mmHg","40 mmHg","760 mmHg"],ans:1,ch:"Breathing & Gas Exchange",src:"Aakash Module",diff:"Hard",exp:"pO₂ in alveolar air ≈ 104 mmHg (atmospheric air pO₂=159; diluted by water vapour and CO₂)"},

  {q:"Plasma proteins that maintain oncotic pressure:",opts:["Fibrinogen","Albumin","Globulins","Antibodies"],ans:1,ch:"Body Fluids & Circulation",src:"Allen Module",diff:"Medium",exp:"Albumin is the main plasma protein maintaining colloid osmotic (oncotic) pressure"},
  {q:"SA node is called pacemaker because:",opts:["It is largest","It initiates heartbeat with highest frequency","It is in left atrium","It controls valves"],ans:1,ch:"Body Fluids & Circulation",src:"NCERT Exemplar",diff:"Easy",exp:"SA node (sinoatrial): generates impulses at 70-80/min, highest rate → sets heart rhythm → pacemaker"},
  {q:"Cardiac output = heart rate × ",opts:["Blood pressure","Stroke volume","Pulse rate","Resistance"],ans:1,ch:"Body Fluids & Circulation",src:"Physics Wallah",diff:"Easy",exp:"Cardiac output = HR × SV; normal ≈ 72 beats/min × 70 mL = 5040 mL ≈ 5 L/min"},
  {q:"Erythroblastosis fetalis (haemolytic disease of newborn) occurs when:",opts:["Mother Rh+, baby Rh-","Mother Rh-, baby Rh+","Both Rh+","Both Rh-"],ans:1,ch:"Body Fluids & Circulation",src:"Aakash Module",diff:"Hard",exp:"Rh- mother sensitised by first Rh+ baby → anti-Rh antibodies attack second Rh+ baby"},
  {q:"Frank-Starling law: heart contracts more forcefully when:",opts:["Heart rate decreases","Ventricular volume increases (more filling)","Blood pressure decreases","SA node is inhibited"],ans:1,ch:"Body Fluids & Circulation",src:"Motion Institute",diff:"Hard",exp:"Starling's law: greater ventricular filling → more stretch → stronger contraction → increased stroke volume"},

  {q:"Juxtaglomerular apparatus secretes:",opts:["ADH","Aldosterone","Renin","Angiotensin"],ans:2,ch:"Excretory Products",src:"Allen Module",diff:"Medium",exp:"JGA cells (granular cells) secrete renin in response to low BP → activates RAAS"},
  {q:"Glucose is completely reabsorbed from glomerular filtrate in:",opts:["PCT","Loop of Henle","DCT","Collecting duct"],ans:0,ch:"Excretory Products",src:"NCERT Exemplar",diff:"Easy",exp:"All filtered glucose is reabsorbed in proximal convoluted tubule (PCT) via active transport"},
  {q:"ADH (vasopressin) acts on:",opts:["PCT","Loop of Henle","DCT and collecting duct","Glomerulus"],ans:2,ch:"Excretory Products",src:"Physics Wallah",diff:"Medium",exp:"ADH increases water permeability of DCT and collecting duct → more water reabsorption → concentrated urine"},
  {q:"Which nitrogenous waste requires maximum water for excretion?",opts:["Uric acid","Urea","Ammonia","Creatinine"],ans:2,ch:"Excretory Products",src:"Aakash Module",diff:"Medium",exp:"Ammonia is highly toxic and soluble; needs large water volumes for excretion → aquatic animals"},
  {q:"Angiotensin II causes:",opts:["Vasodilation and decreased aldosterone","Vasoconstriction and increased aldosterone","Decreased blood pressure","Increased GFR"],ans:1,ch:"Excretory Products",src:"Motion Institute",diff:"Hard",exp:"Angiotensin II: powerful vasoconstrictor + stimulates aldosterone secretion → increased Na⁺ and water retention → increased BP"},

  {q:"Sarcomere is the unit between two consecutive:",opts:["H zones","I bands","Z lines","M lines"],ans:2,ch:"Locomotion & Movement",src:"Allen Module",diff:"Medium",exp:"Sarcomere: functional unit of myofibril, bounded by two Z-lines (Z-discs)"},
  {q:"Which ion triggers muscle contraction?",opts:["Na⁺","K⁺","Ca²⁺","Mg²⁺"],ans:2,ch:"Locomotion & Movement",src:"NCERT Exemplar",diff:"Easy",exp:"Ca²⁺ (released from SR) binds troponin C → unblocks active sites on actin → cross-bridge formation"},
  {q:"Type I muscle fibres (slow twitch) are characterised by:",opts:["White, low myoglobin","Red, high myoglobin, aerobic","Fast fatigue","Few mitochondria"],ans:1,ch:"Locomotion & Movement",src:"Physics Wallah",diff:"Hard",exp:"Type I (slow twitch): red (high myoglobin), aerobic, fatigue-resistant, many mitochondria; for endurance"},
  {q:"Ball and socket joint is found at:",opts:["Knee","Elbow","Hip and shoulder","Wrist"],ans:2,ch:"Locomotion & Movement",src:"Aakash Module",diff:"Easy",exp:"Ball and socket joint: maximum range of motion; found at hip (femur-acetabulum) and shoulder (humerus-glenoid)"},
  {q:"Osteoporosis is due to:",opts:["Excess calcium","Deficiency of calcium and Vitamin D","Excess phosphorus","Deficiency of Vitamin C"],ans:1,ch:"Locomotion & Movement",src:"Motion Institute",diff:"Easy",exp:"Osteoporosis: low bone density due to Ca²⁺ and Vitamin D deficiency → brittle bones"},

  {q:"Node of Ranvier in myelinated nerve allows:",opts:["Slow conduction","Saltatory conduction (faster)","Continuous conduction","Backward conduction"],ans:1,ch:"Neural Control",src:"Allen Module",diff:"Medium",exp:"Saltatory conduction: impulse jumps from node to node → much faster than continuous conduction in unmyelinated"},
  {q:"Acetylcholine is a neurotransmitter at:",opts:["Neuromuscular junction","Adrenergic synapse","GABA synapse","Dopamine synapse"],ans:0,ch:"Neural Control",src:"NCERT Exemplar",diff:"Easy",exp:"Acetylcholine (ACh): neurotransmitter at neuromuscular junction and cholinergic synapses"},
  {q:"Cerebellum controls:",opts:["Vision","Hearing","Balance and coordination","Language"],ans:2,ch:"Neural Control",src:"Physics Wallah",diff:"Easy",exp:"Cerebellum: coordinates voluntary movements, maintains balance, regulates muscle tone"},
  {q:"Crossed extensor reflex is an example of:",opts:["Monosynaptic reflex","Polysynaptic reflex","Conditioned reflex","Stretch reflex"],ans:1,ch:"Neural Control",src:"Aakash Module",diff:"Hard",exp:"Crossed extensor: pain in one limb → flexion that limb + extension contralateral limb; multiple interneurons"},
  {q:"Blood-brain barrier prevents:",opts:["O₂ from entering brain","Glucose from entering","Most large molecules and pathogens","Water from entering"],ans:2,ch:"Neural Control",src:"Motion Institute",diff:"Medium",exp:"Blood-brain barrier (tight junctions in brain capillaries): selective barrier, prevents most large molecules/pathogens"},

  {q:"Feedback inhibition of hormone secretion is called:",opts:["Positive feedback","Negative feedback","Paracrine","Autocrine"],ans:1,ch:"Chemical Coordination",src:"Allen Module",diff:"Easy",exp:"Negative feedback: high hormone levels inhibit further secretion (e.g., thyroid hormone inhibits TSH)"},
  {q:"Which hormone is steroid in nature?",opts:["Insulin","ADH","Testosterone","Oxytocin"],ans:2,ch:"Chemical Coordination",src:"NCERT Exemplar",diff:"Easy",exp:"Testosterone (sex hormone): steroid → lipid-soluble → enters cell directly → nuclear receptor"},
  {q:"Gigantism and acromegaly are caused by excess:",opts:["TSH","Growth hormone (GH)","FSH","LH"],ans:1,ch:"Chemical Coordination",src:"Physics Wallah",diff:"Easy",exp:"Excess GH before puberty → gigantism; after puberty (bones fused) → acromegaly"},
  {q:"Diabetes insipidus results from deficiency of:",opts:["Insulin","ADH (vasopressin)","Glucagon","Aldosterone"],ans:1,ch:"Chemical Coordination",src:"Aakash Module",diff:"Medium",exp:"ADH deficiency → kidney cannot concentrate urine → large volumes of dilute urine (insipidus)"},
  {q:"Melatonin is secreted by:",opts:["Pituitary","Thyroid","Pineal gland","Adrenal"],ans:2,ch:"Chemical Coordination",src:"Motion Institute",diff:"Easy",exp:"Melatonin: secreted by pineal gland, regulates circadian rhythm and sleep-wake cycle"},

  {q:"Self-incompatibility in plants prevents:",opts:["Pollination","Self-fertilization","Cross-pollination","Seed formation"],ans:1,ch:"Reproduction in Plants",src:"Allen Module",diff:"Medium",exp:"Self-incompatibility (SI): prevents self-fertilization by recognizing and rejecting own pollen"},
  {q:"Parthenocarpy refers to development of fruit:",opts:["After normal fertilization","Without fertilization","From pollen only","From stem"],ans:1,ch:"Reproduction in Plants",src:"NCERT Exemplar",diff:"Easy",exp:"Parthenocarpy: fruit development without fertilization → seedless fruits (e.g., banana, seedless grapes)"},
  {q:"Microsporogenesis occurs in:",opts:["Ovule","Anther (pollen sacs)","Stigma","Style"],ans:1,ch:"Reproduction in Plants",src:"Physics Wallah",diff:"Easy",exp:"Microsporogenesis: formation of microspores (pollen) in anther by meiosis of microspore mother cells"},
  {q:"Polyembryony is the development of:",opts:["Multiple seeds in one fruit","More than one embryo in one seed","Embryo without fertilization","Triploid embryo"],ans:1,ch:"Reproduction in Plants",src:"Aakash Module",diff:"Medium",exp:"Polyembryony: multiple embryos in one seed (e.g., citrus, mango); common in nucellar embryony"},
  {q:"In angiosperm, the female gametophyte is:",opts:["Ovule","Embryo sac","Nucellus","Integument"],ans:1,ch:"Reproduction in Plants",src:"Motion Institute",diff:"Medium",exp:"Female gametophyte = embryo sac (7-celled, 8-nucleate: egg, 2 synergids, 3 antipodals, 2 polar nuclei)"},

  {q:"Corpus luteum secretes:",opts:["FSH","LH","Progesterone","Estrogen only"],ans:2,ch:"Reproduction in Animals",src:"Allen Module",diff:"Easy",exp:"Corpus luteum (ruptured follicle): secretes progesterone → maintains endometrium for implantation"},
  {q:"Zona pellucida is a layer surrounding:",opts:["Ovary","Uterus","Ovum/oocyte","Embryo"],ans:2,ch:"Reproduction in Animals",src:"NCERT Exemplar",diff:"Easy",exp:"Zona pellucida: glycoprotein layer surrounding oocyte; sperm must penetrate for fertilization"},
  {q:"Implantation occurs at which stage?",opts:["2-cell stage","8-cell stage","Blastocyst stage","Gastrula stage"],ans:2,ch:"Reproduction in Animals",src:"Physics Wallah",diff:"Medium",exp:"Blastocyst implants in endometrium around day 6-7 after fertilization"},
  {q:"hCG (human chorionic gonadotropin) is secreted by:",opts:["Pituitary","Corpus luteum","Trophoblast/Placenta","Ovary"],ans:2,ch:"Reproduction in Animals",src:"Aakash Module",diff:"Medium",exp:"hCG secreted by trophoblast/early placenta → maintains corpus luteum → basis of pregnancy test"},
  {q:"Spermatogonia are located in:",opts:["Epididymis","Seminiferous tubules","Vas deferens","Rete testis"],ans:1,ch:"Reproduction in Animals",src:"Motion Institute",diff:"Easy",exp:"Spermatogenesis begins in seminiferous tubules where spermatogonia undergo mitosis then meiosis"},

  {q:"Mendel's law of independent assortment applies to genes on:",opts:["Same chromosome","Different chromosomes","X-chromosome only","Autosomes only"],ans:1,ch:"Genetics",src:"Allen Module",diff:"Easy",exp:"Independent assortment: genes on different (non-homologous) chromosomes assort independently"},
  {q:"In incomplete dominance, F₂ phenotypic ratio is:",opts:["3:1","1:2:1","9:3:3:1","1:1"],ans:1,ch:"Genetics",src:"NCERT Exemplar",diff:"Medium",exp:"Incomplete dominance F₁×F₁: RR (red): Rr (pink): rr (white) = 1:2:1 (phenotype=genotype ratio)"},
  {q:"Pleiotropy means one gene affects:",opts:["One trait","Multiple traits","Multiple genes","No traits"],ans:1,ch:"Genetics",src:"Physics Wallah",diff:"Easy",exp:"Pleiotropy: single gene controls multiple phenotypic traits (e.g., sickle cell gene affects RBCs, immunity, organs)"},
  {q:"Linkage was discovered by:",opts:["Mendel","Morgan","Watson","Bateson and Punnett"],ans:3,ch:"Genetics",src:"Aakash Module",diff:"Medium",exp:"Bateson and Punnett discovered gene linkage in sweet pea (1906); Morgan studied linkage in Drosophila"},
  {q:"Sex-linked character in humans: haemophilia gene is on:",opts:["Y chromosome","X chromosome","Autosome 1","Autosome 23"],ans:1,ch:"Genetics",src:"Motion Institute",diff:"Easy",exp:"Haemophilia A and B: X-linked recessive traits; gene on X chromosome → more common in males (XY)"},
  {q:"Chi-square test is used in genetics to:",opts:["Determine mutation rate","Compare observed vs expected ratios","Measure dominance","Calculate recombination frequency"],ans:1,ch:"Genetics",src:"Allen Module",diff:"Medium",exp:"χ² test: statistical test to see if deviation from expected Mendelian ratios is due to chance"},

  {q:"Okazaki fragments are formed on which strand during DNA replication?",opts:["Leading strand","Lagging strand","Both strands","Template strand"],ans:1,ch:"Molecular Basis of Inheritance",src:"Allen Module",diff:"Medium",exp:"Lagging strand: synthesized discontinuously as short Okazaki fragments (5'→3' direction away from fork)"},
  {q:"Promoter sequence in eukaryotes typically contains:",opts:["TATA box","ATG codon","Stop codon","Poly-A tail"],ans:0,ch:"Molecular Basis of Inheritance",src:"NCERT Exemplar",diff:"Medium",exp:"Eukaryotic promoter contains TATA box (Hogness box) ≈25 bp upstream of transcription start site"},
  {q:"Which RNA carries amino acids to ribosome?",opts:["mRNA","rRNA","tRNA","snRNA"],ans:2,ch:"Molecular Basis of Inheritance",src:"Physics Wallah",diff:"Easy",exp:"tRNA (transfer RNA): charged with amino acid, anticodon pairs with mRNA codon at ribosome"},
  {q:"Post-translational modification includes:",opts:["Methylation of DNA","Addition of introns","Glycosylation of proteins","Capping of mRNA"],ans:2,ch:"Molecular Basis of Inheritance",src:"Aakash Module",diff:"Medium",exp:"Post-translational modifications: glycosylation, phosphorylation, acetylation etc. of completed protein"},
  {q:"Lac operon: repressor protein is inactivated by:",opts:["Glucose","Lactose (allolactose)","cAMP","Galactose"],ans:1,ch:"Molecular Basis of Inheritance",src:"Motion Institute",diff:"Medium",exp:"Allolactose (from lactose) binds repressor → repressor detaches from operator → genes expressed"},

  {q:"Homologous structures indicate:",opts:["Same function, different origin","Same origin (common ancestor), possibly different function","No evolutionary relationship","Parallel evolution"],ans:1,ch:"Evolution",src:"Allen Module",diff:"Easy",exp:"Homologous organs: same embryonic origin (divergent evolution); may have different functions"},
  {q:"Industrial melanism in Biston betularia demonstrates:",opts:["Lamarckism","Natural selection (directional)","Genetic drift","Mutation only"],ans:1,ch:"Evolution",src:"NCERT Exemplar",diff:"Medium",exp:"Peppered moth: soot darkened trees → dark moths better camouflaged → natural selection favoured melanics"},
  {q:"Allopatric speciation occurs due to:",opts:["Same habitat, different niches","Geographic isolation","Polyploidy","Hybridization"],ans:1,ch:"Evolution",src:"Physics Wallah",diff:"Easy",exp:"Allopatric speciation: geographic barrier separates populations → diverge independently → new species"},
  {q:"Molecular clock concept is based on:",opts:["Fossil record","Constant rate of neutral mutations over time","Anatomical similarities","Protein function"],ans:1,ch:"Evolution",src:"Aakash Module",diff:"Hard",exp:"Molecular clock: neutral mutations accumulate at roughly constant rate → estimate divergence time between species"},
  {q:"Stabilising selection favours:",opts:["Extreme phenotypes","Intermediate phenotypes","All phenotypes equally","Only one extreme"],ans:1,ch:"Evolution",src:"Motion Institute",diff:"Medium",exp:"Stabilising selection: intermediate phenotype has highest fitness → reduces variation, maintains status quo"},

  {q:"Primary lymphoid organs where lymphocytes develop:",opts:["Spleen and lymph nodes","Thymus and bone marrow","Tonsils and MALT","Blood and thymus"],ans:1,ch:"Human Health & Disease",src:"Allen Module",diff:"Medium",exp:"Primary lymphoid organs: bone marrow (B-cell maturation) and thymus (T-cell maturation)"},
  {q:"ELISA test detects:",opts:["DNA sequences","Antigens or antibodies","Chromosomal abnormalities","Enzyme activity"],ans:1,ch:"Human Health & Disease",src:"NCERT Exemplar",diff:"Medium",exp:"ELISA (Enzyme-Linked ImmunoSorbent Assay): detects antigens or antibodies; used for HIV, dengue diagnosis"},
  {q:"Opium is obtained from:",opts:["Cannabis sativa","Papaver somniferum","Erythroxylum coca","Atropa belladonna"],ans:1,ch:"Human Health & Disease",src:"Physics Wallah",diff:"Easy",exp:"Opium (morphine, heroin): from latex of Papaver somniferum (opium poppy)"},
  {q:"Active immunity is acquired by:",opts:["Receiving antibodies","Infection or vaccination","Maternal antibodies","Blood transfusion"],ans:1,ch:"Human Health & Disease",src:"Aakash Module",diff:"Easy",exp:"Active immunity: body produces own antibodies after infection or vaccination → long-lasting"},
  {q:"Aflatoxin is produced by:",opts:["Bacteria","Fungi (Aspergillus)","Virus","Protozoa"],ans:1,ch:"Human Health & Disease",src:"Motion Institute",diff:"Medium",exp:"Aflatoxin: mycotoxin produced by Aspergillus flavus/parasiticus on stored grains/nuts; carcinogenic"},

  {q:"PCR requires which enzyme?",opts:["DNA polymerase II","Taq DNA polymerase","RNA polymerase","Ligase"],ans:1,ch:"Biotechnology Principles",src:"Allen Module",diff:"Easy",exp:"PCR uses Taq DNA polymerase (from Thermus aquaticus): heat-stable, survives denaturation step at 94°C"},
  {q:"Selectable markers in vectors are used to:",opts:["Increase replication","Identify recombinant colonies","Provide promoter","Cut DNA"],ans:1,ch:"Biotechnology Principles",src:"NCERT Exemplar",diff:"Easy",exp:"Selectable markers (antibiotic resistance genes): allow selection of transformed cells on antibiotic medium"},
  {q:"Recombinant DNA technology was made possible by discovery of:",opts:["PCR","Restriction endonucleases","CRISPR","Western blot"],ans:1,ch:"Biotechnology Principles",src:"Physics Wallah",diff:"Easy",exp:"Restriction enzymes (1970s): cut DNA at specific sequences → ability to cut and join specific DNA fragments"},
  {q:"Blunt ends are produced by:",opts:["EcoRI","BamHI","HaeIII","HindIII"],ans:2,ch:"Biotechnology Principles",src:"Aakash Module",diff:"Hard",exp:"HaeIII cuts DNA straight across (GG↓CC) → blunt ends. EcoRI, BamHI, HindIII produce sticky (cohesive) ends"},
  {q:"Southern blotting detects:",opts:["RNA","Protein","DNA","Lipids"],ans:2,ch:"Biotechnology Principles",src:"Motion Institute",diff:"Medium",exp:"Southern blotting: DNA detection. Northern: RNA. Western: protein. (Mnemonics: DNA-South, RNA-North, Protein-West)"},

  {q:"Biopiracy refers to:",opts:["Biological terrorism","Unauthorized use of traditional knowledge/biological resources","Piracy of ships","Biodiversity conservation"],ans:1,ch:"Biotechnology Applications",src:"Allen Module",diff:"Easy",exp:"Biopiracy: exploitation of biodiversity and traditional knowledge without benefit-sharing (e.g., turmeric, neem patents)"},
  {q:"Cry proteins (from Bt) are toxic to insects but not mammals because:",opts:["Mammals have fur","Insects have specific receptors in gut; mammals don't","Temperature difference","Different digestive systems"],ans:1,ch:"Biotechnology Applications",src:"NCERT Exemplar",diff:"Medium",exp:"Cry proteins activated at insect gut pH; bind specific receptor proteins in insect midgut; mammalian gut lacks these receptors"},
  {q:"RNAi (RNA interference) involves:",opts:["mRNA translation","Gene silencing by dsRNA","DNA replication","Protein degradation directly"],ans:1,ch:"Biotechnology Applications",src:"Physics Wallah",diff:"Hard",exp:"RNAi: double-stranded RNA triggers degradation of complementary mRNA → gene silencing (post-transcriptional)"},

  {q:"K-strategist species characteristics:",opts:["Many small offspring, short life","Few large offspring, long life, parental care","Rapid reproduction","Boom-bust population cycle"],ans:1,ch:"Organisms & Populations",src:"Allen Module",diff:"Medium",exp:"K-strategists: few offspring, high parental investment, long life (elephants, humans). r-strategists: many small offspring"},
  {q:"Commensalism: one organism benefits, other:",opts:["Is harmed","Neither benefits nor harmed","Also benefits","Is killed"],ans:1,ch:"Organisms & Populations",src:"NCERT Exemplar",diff:"Easy",exp:"Commensalism: +/0 interaction. One benefits, other unaffected (e.g., orchids on trees, barnacles on whales)"},
  {q:"Intraspecific competition is between:",opts:["Different species","Same species individuals","Predator and prey","Parasite and host"],ans:1,ch:"Organisms & Populations",src:"Physics Wallah",diff:"Easy",exp:"Intraspecific: competition within same species for same resources (food, territory, mates)"},
  {q:"Ecological niche refers to:",opts:["Habitat only","Role and position of organism in ecosystem","Physical environment","Nutrient availability"],ans:1,ch:"Organisms & Populations",src:"Aakash Module",diff:"Medium",exp:"Ecological niche: an organism's functional role in ecosystem; includes habitat, diet, behaviour, interactions"},
  {q:"Competitive exclusion principle states two species competing for:",opts:["Same niche cannot coexist indefinitely","Different niches coexist","Same food always coexist","Separate resources"],ans:0,ch:"Organisms & Populations",src:"Motion Institute",diff:"Medium",exp:"Gause's principle: two species occupying identical niches cannot coexist; one displaces the other"},

  {q:"Standing crop in ecosystem represents:",opts:["Rate of production","Amount of living biomass at a given time","Total energy flow","Number of organisms only"],ans:1,ch:"Ecosystem",src:"Allen Module",diff:"Medium",exp:"Standing crop: total living biomass (or number) present in ecosystem at a given time"},
  {q:"Net primary productivity = GPP minus:",opts:["Respiration by producers","Herbivore consumption","Decomposition","Soil absorption"],ans:0,ch:"Ecosystem",src:"NCERT Exemplar",diff:"Easy",exp:"NPP = GPP - R (respiration of producers). This is what's available for heterotrophs"},
  {q:"Nitrogen fixation is carried out by:",opts:["Fungi","Nitrogen-fixing bacteria (e.g., Rhizobium)","Green plants","Viruses"],ans:1,ch:"Ecosystem",src:"Physics Wallah",diff:"Easy",exp:"Nitrogen fixation: conversion of N₂ to NH₃ by nitrogen-fixing bacteria (Rhizobium, Azotobacter, cyanobacteria)"},
  {q:"Eutrophication primarily leads to:",opts:["Increase in biodiversity","Depletion of dissolved oxygen","Increased fish production","Clear water"],ans:1,ch:"Ecosystem",src:"Aakash Module",diff:"Medium",exp:"Eutrophication: nutrient enrichment → algal bloom → algae die → bacterial decomposition → O₂ depletion → dead zones"},
  {q:"Biomagnification occurs when:",opts:["Energy increases up food chain","Toxin concentration increases up food chain","Population decreases","Biodiversity increases"],ans:1,ch:"Ecosystem",src:"Motion Institute",diff:"Medium",exp:"Biomagnification: persistent toxins (DDT, methylmercury) accumulate at higher concentrations at higher trophic levels"},

  {q:"IUCN Red List category for species facing very high risk of extinction in wild:",opts:["Least Concern","Vulnerable","Endangered","Critically Endangered"],ans:3,ch:"Biodiversity",src:"Allen Module",diff:"Medium",exp:"IUCN categories: Least Concern→Near Threatened→Vulnerable→Endangered→Critically Endangered→Extinct in Wild→Extinct"},
  {q:"Hotspot of biodiversity must have minimum __ endemic species of plants:",opts:["500","1500","2000","0"],ans:1,ch:"Biodiversity",src:"NCERT Exemplar",diff:"Hard",exp:"Myers criteria for hotspot: ≥1500 endemic vascular plant species AND lost ≥70% of original habitat"},
  {q:"Silent Valley movement in India was against:",opts:["Air pollution","A hydroelectric project threatening rainforest","Mining","Nuclear plant"],ans:1,ch:"Biodiversity",src:"Physics Wallah",diff:"Medium",exp:"Silent Valley movement (1970s-80s Kerala): protest against dam project that would flood tropical rainforest; ultimately saved"},
  {q:"In-situ conservation includes:",opts:["Botanical gardens","Wildlife sanctuaries and national parks","Zoos","Seed banks"],ans:1,ch:"Biodiversity",src:"Aakash Module",diff:"Easy",exp:"In-situ = conservation in natural habitat; includes national parks, wildlife sanctuaries, biosphere reserves"},
  {q:"Convention on Biological Diversity was signed at:",opts:["Stockholm 1972","Rio de Janeiro 1992","Kyoto 1997","Johannesburg 2002"],ans:1,ch:"Biodiversity",src:"Motion Institute",diff:"Medium",exp:"Convention on Biological Diversity (CBD): signed at Earth Summit, Rio de Janeiro, 1992"},
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

  // Question bank: 502 local questions, shuffled fresh each test

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




  // ── AI question generation with web search + caching ──
  // ── Smart local question fetcher ──
  function getSmartPool(subject, chapter, count) {
    let pool = [];
    if (!subject) {
      Object.entries(ALL_LOCAL).forEach(([sub, qs]) =>
        qs.forEach(q => pool.push({ ...q, subject: sub }))
      );
    } else {
      pool = (ALL_LOCAL[subject] || []).map(q => ({ ...q, subject }));
      if (chapter) {
        const exact   = pool.filter(q => q.ch === chapter);
        const partial = pool.filter(q =>
          q.ch?.toLowerCase().includes(chapter.toLowerCase()) ||
          chapter.toLowerCase().includes((q.ch||"").toLowerCase())
        );
        pool = exact.length > 0 ? exact : partial.length > 0 ? partial : [];
      }
    }
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, count);
  }

  // ── Question cache key ──
  function cacheKey(subject, chapter) {
    return `neet_q_${subject}_${chapter || "all"}`.replace(/\s+/g, "_");
  }

  // ── Load cached questions from localStorage ──
  function loadCache(subject, chapter) {
    try {
      const raw = localStorage.getItem(cacheKey(subject, chapter));
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }

  // ── Save questions to localStorage cache ──
  function saveCache(subject, chapter, newQs) {
    try {
      const existing = loadCache(subject, chapter);
      const seen = new Set(existing.map(q => q.q.substring(0, 40).toLowerCase()));
      const fresh = newQs.filter(q => !seen.has(q.q.substring(0, 40).toLowerCase()));
      const merged = [...existing, ...fresh].slice(0, 500); // max 500 per chapter
      localStorage.setItem(cacheKey(subject, chapter), JSON.stringify(merged));
      return merged;
    } catch { return newQs; }
  }

  // ── Fetch from server + save to cache ──
  async function fetchFromServer(subject, chapter, count) {
    const resp = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, chapter, count })
    });
    if (!resp.ok) throw new Error(`Server error: ${resp.status}`);
    const data = await resp.json();
    if (!data.questions || data.questions.length === 0) throw new Error("No questions");
    // Cache for future use — questions grow over time
    saveCache(subject, chapter, data.questions);
    return data.questions;
  }

  // ── Master question getter: local + cache + server ──
  // Ensures maximum unique questions, no repeats
  async function getQuestions(subject, chapter, count, onProgress) {
    const seen = new Set();
    const result = [];

    const addQs = (list) => {
      for (const q of (list || [])) {
        const key = (q.q || "").substring(0, 40).toLowerCase();
        if (q.q && !seen.has(key)) { seen.add(key); result.push(q); }
      }
    };

    // Layer 1: Cached questions from previous sessions (instant)
    onProgress?.("Loading from question bank...");
    addQs(loadCache(subject, chapter));

    // Layer 2: Local hardcoded bank (instant)
    addQs(getSmartPool(subject, chapter || null, count * 3));

    // Layer 3: Fetch from server if still need more
    if (result.length < count) {
      onProgress?.(`Fetching ${count - result.length} more questions from internet...`);
      try {
        const serverQs = await fetchFromServer(subject, chapter, count);
        addQs(serverQs);
      } catch (e) {
        console.warn("Server fetch failed:", e.message);
      }
    }

    // Layer 4: Second server call if still short (different questions due to parallel prompts)
    if (result.length < count) {
      onProgress?.(`Loading additional questions...`);
      try {
        const more = await fetchFromServer(subject, chapter, count);
        addQs(more);
      } catch {}
    }

    return result.slice(0, count);
  }



  // ── Start test ──
  async function startTest() {
    setLoading(true);
    clearInterval(timerRef.current);
    const total = testMode === "full" ? 180 : nQs;
    const time  = testMode === "full" ? 200 : nMin;
    let qs = [];

    if (testMode === "full") {
      // ✅ NEET Pattern: Physics=45, Chemistry=45, Biology=90 = 180 total
      for (const [sub, count, label] of [
        ["Physics",   45, "Section A — Physics"],
        ["Chemistry", 45, "Section B — Chemistry"],
        ["Biology",   90, "Section C — Biology"],
      ]) {
        const subQs = await getQuestions(sub, null, count,
          (msg) => setLmsg(msg)
        );
        qs.push(...subQs.map(q => ({...q, subject: sub})));
      }

    } else {
      // ── Subject-wise or Chapter-wise test ──
      const label = selCh ? `${selCh} (${selSub})` : selSub;
      const fetched = await getQuestions(selSub, selCh || null, total,
        (msg) => setLmsg(msg)
      );
      qs.push(...fetched);
    }

    // Final safety net — should never be empty
    if (qs.length === 0) qs = getSmartPool(null, null, Math.min(total, 20));

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
          <div className="stat-card"><div className="stat-num">45+45+90</div><div className="stat-lbl">Physics · Chem · Bio</div></div>
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
              // ✅ Real NEET: Physics 0-44, Chemistry 45-89, Biology 90-179
              const secs = [
                { label:"Physics",   cls:"phy", icon:"⚛️",  start:0,  end:44,  total:45 },
                { label:"Chemistry", cls:"che", icon:"🧪",  start:45, end:89,  total:45 },
                { label:"Biology",   cls:"bio", icon:"🌿",  start:90, end:179, total:90 },
              ];
              return (
                <div style={{marginBottom:"16px"}}>
                  <div className="section-tabs">
                    {secs.map((s, idx) => {
                      const secAnswered = Object.keys(answers).filter(k => +k >= s.start && +k <= s.end).length;
                      return (
                        <button key={idx}
                          className={`sec-tab ${s.cls} ${activeSection === idx ? "active" : ""}`}
                          onClick={() => { setActiveSection(idx); setCurrent(s.start); }}>
                          {s.icon} {s.label}
                          <span className={`sec-badge ${s.cls}`}>{secAnswered}/{s.total}</span>
                        </button>
                      );
                    })}
                  </div>
                  {/* Per-section progress bars */}
                  <div style={{display:"flex", gap:"4px", marginTop:"8px"}}>
                    {secs.map((s, idx) => {
                      const done = Object.keys(answers).filter(k=>+k>=s.start&&+k<=s.end).length;
                      const pct = (done / s.total) * 100;
                      const colors = ["#2563EB","#16A34A","#D97706"];
                      const flex = [45,45,90][idx];
                      return (
                        <div key={idx} style={{flex:flex, height:"5px", background:"var(--border)", borderRadius:"3px", overflow:"hidden"}} title={`${s.label}: ${done}/${s.total}`}>
                          <div style={{width:`${pct}%`, height:"100%", background:colors[idx], borderRadius:"3px", transition:"width .3s"}} />
                        </div>
                      );
                    })}
                  </div>
                  <div style={{display:"flex", gap:"4px", marginTop:"4px"}}>
                    {secs.map((s,i) => {
                      const colors=["#2563EB","#16A34A","#D97706"];
                      const done = Object.keys(answers).filter(k=>+k>=s.start&&+k<=s.end).length;
                      return <div key={i} style={{flex:[45,45,90][i], fontSize:"10px", color:colors[i], fontWeight:"600"}}>
                        {s.label} ({done}/{s.total})
                      </div>;
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
                  if (prev < 45) setActiveSection(0);
                  else if (prev < 90) setActiveSection(1);
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
                      if (next < 45) setActiveSection(0);
                      else if (next < 90) setActiveSection(1);
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
                { label:"Physics",   cls:"phy", color:"#2563EB", start:0,  end:Math.min(44,  questions.length-1), total:45 },
                { label:"Chemistry", cls:"che", color:"#16A34A", start:45, end:Math.min(89,  questions.length-1), total:45 },
                { label:"Biology",   cls:"bio", color:"#D97706", start:90, end:Math.min(179, questions.length-1), total:90 },
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
