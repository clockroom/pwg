const INIT_X=123456789;
const INIT_Y=362436069;
const INIT_Z=521288629;
const INIT_W=88675123;

export default class {

	constructor(x=null,y=null,z=null,w=null)
	{
		this.x=x===null ? INIT_X : x;
		this.y=y===null ? INIT_Y : y;
		this.z=z===null ? INIT_Z : z;
		this.w=w===null ? INIT_W : w;
	}

	next()
	{
		const t=this.x^(this.x<<11);
		this.x=this.y;
		this.y=this.z;
		this.z=this.w;
		return (this.w=(this.w^(this.w>>>19))^(t^(t>>>8)))>>>0;
	}

};
