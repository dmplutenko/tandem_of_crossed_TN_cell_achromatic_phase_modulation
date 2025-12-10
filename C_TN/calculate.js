#!/usr/bin/env node

const mathjs=require("mathjs");
const math=mathjs;

//Jones Matrix of twisted nematic
//f - mean angle \fi
//gamma = (ne-n0)*k/2;
//q=(\fi_2-\fi_1)/h
//h - width of the cell
function T_Jones_TN(f,gamma,q,h){
	const fd=q*h;
	const gamma1=Math.sqrt(gamma*gamma+q*q);
	const A=Math.cos(gamma1*h);
	const B=q/gamma1*Math.sin(gamma1*h)
	const C=gamma/gamma1*Math.sin(gamma1*h);
	const T11=math.multiply( math.exp(math.complex(0,fd)),  math.complex(A,-B));
	const T12=math.multiply( math.exp(math.complex(0,2*f)),math.complex(0,C));
	const T21=math.multiply( math.exp(math.complex(0,-2*f)),math.complex(0,C));
	const T22=math.multiply( math.exp(math.complex(0,-fd)),  math.complex(A,B));
	return math.matrix([[T11,T12],[T21,T22]]);
}

//Transmission coefficient of the Tandem TN cell - Exact
//f - full rotation angle
// gamma = (ne-n0)*k/2; - the same for both cells
// h - mean width of the cells h=(h1+h2)/2
// dh = h2-h1
function T_CTN(f,gamma,h,dh){
	const h1=h+dh/2;
	const h2=h-dh/2;
	const gamma1=gamma;
	const gamma2=gamma;
	const q1=f/2/h1;
	const q2=f/2/h2;
	const f2=Math.PI/2+f/4;
	const f1=-f/4;
	const M=math.multiply(T_Jones_TN(f2,gamma2,q2,h2),T_Jones_TN(f1,gamma1,q1,h1));
	return M.get([0,0]);
}

//First order approximation of the crossed tandem cell
function T_CTN_Eq1(f,gamma,h,dh){
	const h1=h+dh/2;
	const h2=h-dh/2;
	const q1=f/2/h1;
	const q2=f/2/h2;
	const beta=(h1-h2)/(h1+h2);
	const gamma1=Math.sqrt(gamma*gamma+q1*q1);
	const gamma2=Math.sqrt(gamma*gamma+q2*q2);
	const Fs=gamma1*h1+gamma2*h2;
	const Fd=gamma1*h1-gamma2*h2;
	return math.multiply(Math.cos(Fd),math.exp(math.complex(0,f*(1-(Math.sin(Fs))/(Fs*Math.cos(Fd) )))))
	//const A=math.complex(Math.cos(gamma1*h1-gamma2*h2)-2*alpha*alpha*Math.sin(gamma1*h1)*Math.sin(gamma2*h2),-alpha*Math.sin(gamma1*h1+gamma2*h2)-alpha*beta*Math.sin(gamma2*h2-gamma1*h1));
	//return math.multiply(math.exp(math.complex(0,f)),A);
	//return math.multiply(Math.cos(Fd),math.exp(math.complex(0,f*(1-(Math.sin(Fs))/(Fs*Math.cos(Fd) )))))
}

//Second order approximation of the crossed tandem cell: T11
function T_CTN_Eq2(f,gamma,h,dh){
	const h1=h+dh/2;
	const h2=h-dh/2;
	const q1=f/2/h1;
	const q2=f/2/h2;
	const beta=(h1-h2)/(h1+h2);
	const gamma1=Math.sqrt(gamma*gamma+q1*q1);
	const gamma2=Math.sqrt(gamma*gamma+q2*q2);
	const Fs=gamma1*h1+gamma2*h2;
	const Fd=gamma1*h1-gamma2*h2;
	const alpha=0.5*(f/2/h1/gamma1+f/2/h2/gamma2);
	const A=math.complex(Math.cos(gamma1*h1-gamma2*h2)-2*alpha*alpha*Math.sin(gamma1*h1)*Math.sin(gamma2*h2),-alpha*Math.sin(gamma1*h1+gamma2*h2)-alpha*beta*Math.sin(gamma2*h2-gamma1*h1));
	return math.multiply(math.exp(math.complex(0,f)),A);
	//return math.multiply(math.exp(math.complex(0,f)),math.complex(Math.cos(Fd),-alpha*Math.sin(Fs) ));
	
}

function AP1_CTN(alpha,Fs,b,f){
	const ap={
		A:2*Math.sin(0.5*b*Fs)**2+2*alpha*alpha,
		P1:1/Fs/Math.abs(Math.cos(b*Fs)),
		P0:0
	}
	ap.P=ap.P1*f+ap.P0;
	return ap;
}



function normalize_F(f){
	while(f<Math.PI){
		f+=2*Math.PI;
	}
	while(f>Math.PI){
		f-=2*Math.PI;
	}
	return f;
}

function AfromC(c){
	return 1-math.abs(c)
}
function PfromC(c,f){
	return normalize_F(math.arg(c)-f)
}
// dn=(n2-n1)
// h - height of one cell
// 
function show_graph(N,dn,h,b,lambda1,lambda2){
	let f=Math.PI;
	for(let i=0;i<N;i++){
		const lambda=lambda1+(lambda2-lambda1)/N*i;
		const gamma=dn/2*2*Math.PI/lambda;
		const dh=2*h*b;
		const h1=h+dh/2;
		const h2=h-dh/2;
		const q1=f/2/h1;
		const q2=f/2/h2;
		const beta=(h1-h2)/(h1+h2);
		const gamma1=Math.sqrt(gamma*gamma+q1*q1);
		const gamma2=Math.sqrt(gamma*gamma+q2*q2);
		const alpha=0.5*(f/2/h1/gamma1+f/2/h2/gamma2);
		const Fs=gamma1*h1+gamma2*h2;
		const Fd=gamma1*h1-gamma2*h2;
		const T_exact=T_CTN(f,gamma,h,dh);
		const T_eq1=T_CTN_Eq1(f,gamma,h,dh);
		const T_eq2=T_CTN_Eq2(f,gamma,h,dh);
		const AP=AP1_CTN(alpha,Fs,beta,f);
		//lambda
		console.log(lambda,AfromC(T_exact),AfromC(T_eq1),AfromC(T_eq2),AP.A,PfromC(T_exact,f),PfromC(T_eq1,f),PfromC(T_eq2,f),AP.P,gamma,gamma1,gamma2,alpha,beta,Fs,Fd)
	}
}

show_graph(5000,0.2,10000,0.02,450,750);
