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




//Transmission coefficient of the compensated A cell
function T_CTN_A(f,gamma,h,dh){
	const h1=h+dh/2;
	const h2=h-dh/2;
	const hc=-dh;
	const gamma1=gamma;
	const gamma2=gamma;
	const q1=f/2/h1;
	const q2=f/2/h2;
	const f2=Math.PI/2+f/4;
	const f1=-f/4;
	const M=math.multiply(T_Jones_TN(f2,gamma2,q2,h2),math.multiply(T_Jones_TN(0,gamma,0,hc),T_Jones_TN(f1,gamma1,q1,h1)) );
	return M.get([0,0]);
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
		const T_exactA=T_CTN_A(f,gamma,h,dh);	
		const AP_A=AP1_CTN_A(alpha,Fs,beta,f);
		console.log(lambda,AfromC(T_exactA),AP_A.A,PfromC(T_exactA,f),AP_A.P, gamma,gamma1,gamma2,alpha,beta,Fs,Fd)
	}
}

show_graph(5000,0.2,100000,0.05,450,750);
