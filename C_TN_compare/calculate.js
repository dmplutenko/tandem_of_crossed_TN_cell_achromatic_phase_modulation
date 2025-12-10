#!/usr/bin/env node

const mathjs=require("mathjs");
const math=mathjs;



function AP1_CTN(alpha,Fs,b,f){
	const ap={
		A:2*Math.sin(0.5*b*Fs)**2+2*alpha*alpha,
		P1:1/Fs/Math.abs(Math.cos(b*Fs)),
		P0:0
	}
	ap.P=ap.P1*f+ap.P0;
	return ap;
}

function AP1_CTN_A(alpha,Fs,b,f){
	const ap={
		A:2*alpha*alpha,
		P1:1/Fs,
		P0:0
	}
	ap.P=ap.P1*f+ap.P0;
	return ap;
}

function AP1_CTN_B(alpha,Fs,b,f,lambda,lambda0){
	const omega=1/lambda;
	const omega0=1/lambda0;
	const ap={
		A:2*(Math.sin(0.5*b*Fs)**2)+alpha*alpha*(0.5+2*Math.abs(Math.sin(Math.PI/2*(omega-omega0)/omega0 ))),
		P1:Math.abs(Math.sin(Math.PI/2*(omega-omega0)/omega0 ))/Fs/Math.abs(Math.cos(b*Fs)),
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
function show_graph(N,dn,h,b,hA,bA,lambda1,lambda2,lambda0){
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
		//===================================================================
		const dhA=2*hA*bA;
		const h1A=hA+dhA/2;
		const h2A=hA-dhA/2;
		const q1A=f/2/h1;
		const q2A=f/2/h2;
		const betaA=(h1A-h2A)/(h1A+h2A);
		const gamma1A=Math.sqrt(gamma*gamma+q1A*q1A);
		const gamma2A=Math.sqrt(gamma*gamma+q2A*q2A);
		const alphaA=0.5*(f/2/h1A/gamma1A+f/2/h2A/gamma2A);

		const FsA=gamma1A*h1A+gamma2A*h2A;
		const FdA=gamma1A*h1A-gamma2A*h2A;

		

		const AP=AP1_CTN(alpha,Fs,beta,f);
		const AP_A=AP1_CTN_A(alphaA,FsA,betaA,f);
		const AP_B=AP1_CTN_B(alpha,Fs,beta,f,lambda,lambda0);

		console.log(lambda,AP.A,AP_A.A,AP_B.A,AP.P,AP_A.P,AP_B.P,gamma,gamma1,gamma2,alpha,alphaA,beta,Fs,Fd)
	}
}

show_graph(5000,0.2,10000,0.02,100000,0.05,450,750,600);
