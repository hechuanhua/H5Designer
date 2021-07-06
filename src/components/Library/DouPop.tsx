import styled from 'styled-components';
import { useState } from 'react';
import WechatPopup from './WechatPopup';

import { LayoutConfig } from '../../typings/LayoutData'

import '../../assets/style/doupop.scss';


const DouPop = (props:{onClose:()=>void}) => {
	const [index,setIndex] = useState(0)
	const [wechatPopupVisibility,setWechatPopupVisibility] = useState(false)
	const [error,setError] = useState(false)
	const { onClose } = props

	function $all(el:string):NodeList{
		return document.querySelectorAll(el)
	}

	const next = () => {
		if(index===0){
			if(!Array.from($all('input[name="sex"]')).some((item:any)=>item.checked) || !Array.from($all('input[name="age"]')).some((item:any)=>item.checked) || !Array.from($all('input[name="q1"]')).some((item:any)=>item.checked) ||  !Array.from($all('input[name="q2"]')).some((item:any)=>item.checked)){
				return setError(true)
			}
		} else if(index===1){
			if(!Array.from($all('input[name="q3"]')).some((item:any)=>item.checked) || !Array.from($all('input[name="q4"]')).some((item:any)=>item.checked) || !Array.from($all('input[name="q5"]')).some((item:any)=>item.checked)){
				return setError(true)
			}
		} else if(index===2){
			if(!Array.from($all('input[name="q6"]')).some((item:any)=>item.checked)){
				return setError(true)
			}
		}
		setError(false)
		const i = index + 1
		if(i >= 3){
			setWechatPopupVisibility(true)
			return
		}
		setIndex(i)
	}
	return (
		<div className="douPopBox">
			<div className="douPop_page fs-fields">
				<li className={index == 0?'fs-current':''}>
					<div className="fs-radio-group clearfix fs-anim-lower rel">
						<img src="https://qu.xueyaun.cn/yina/rgba/Picture/age7.jpg" alt="" />
						<img src="https://qu.xueyaun.cn/yina/rgba/Picture/survey_yq9_2_02.jpg" alt="" />
						<label id="nan">
							<input name="sex" type="radio" value="0" required={true}/>
						</label>
						<label id="nv">
								<input name="sex" type="radio" value="1" required={true}/>
						</label>
						<label id="yu1" className="yun dianping">
								<input name="age" type="radio" value="0" required={true}/>
						</label>
						<label id="yu2" className="yun">
								<input name="age" type="radio" value="1" required={true}/>
						</label>
						<label id="yu3" className="yun">
								<input name="age" type="radio" value="2" required={true}/>
						</label>
						<label id="yu4" className="yun">
								<input name="age" type="radio" value="A" required={true}/>
						</label>
						<label>
								<input name="q1" type="radio" value="B" required={true}/>
						</label>
						<label>
								<input name="q1" type="radio" value="C" required={true}/>
						</label>
						<label>
								<input name="q1" type="checkbox" value="A" required={true}/>
						</label>
						<label>
								<input name="q1" type="checkbox" value="B" required={true}/>
						</label>
						<label>
								<input name="q2" type="checkbox" value="C" required={true}/>
						</label>
						<label>
								<input name="q2" type="checkbox" value="D" required={true}/>
						</label>
						<label>
								<input name="q2" type="checkbox" value="E" required={true}/>
						</label>
						<label>
								<input name="q2" type="checkbox" value="F" required={true}/>
						</label>
						<label>
								<input name="q2" type="checkbox" value="G" required={true}/>
						</label>
						<label>
								<input name="q2" type="checkbox" value="H" required={true}/>
						</label>
						<p className="next" style={{left:'30.31%',top:'88.4%',width:'34.84%',height:'6.9%'}} onClick={next}></p>
					</div>
				</li>
				<li className={index == 1?'fs-current':''}>
					<div className="fs-radio-group clearfix fs-anim-lower rel">
						<img src="https://qu.xueyaun.cn/yina/rgba/Picture/survey_yq9_3_01.jpg"/>
						<img src="https://qu.xueyaun.cn/yina/rgba/Picture/survey_yq9_3_02.jpg"/>
						<label>
								<input name="q3" type="radio" value="A" required={true}/>
						</label>
						<label>
								<input name="q3" type="radio" value="B" required={true}/>
						</label>
						<label>
								<input name="q3" type="radio" value="C" required={true}/>
						</label>
						<label>
								<input name="q3" type="radio" value="D" required={true}/>
						</label>
						<label>
								<input name="q3" type="radio" value="E" required={true}/>
						</label>
						<label>
								<input name="q3" type="radio" value="F" required={true}/>
						</label>
						<label>
								<input name="q3" type="radio" value="G" required={true}/>
						</label>
						<label>
								<input name="q3" type="radio" value="H" required={true}/>
						</label>

						<label>
								<input name="q4" type="radio" value="A" required={true}/>
						</label>
						<label>
								<input name="q4" type="radio" value="B" required={true}/>
						</label>
						<label>
								<input name="q4" type="radio" value="C" required={true}/>
						</label>
						<label>
								<input name="q4" type="radio" value="D" required={true}/>
						</label>

						<label>
								<input name="q5" type="checkbox" value="A" required={true}/>
						</label>
						<label>
								<input name="q5" type="checkbox" value="B" required={true}/>
						</label>
						<label>
								<input name="q5" type="checkbox" value="C" required={true}/>
						</label>
						<label>
								<input name="q5" type="checkbox" value="D" required={true}/>
						</label>
						<label>
								<input name="q5" type="checkbox" value="E" required={true}/>
						</label>
						<label>
								<input name="q5" type="checkbox" value="F" required={true}/>
						</label>
						<label>
								<input name="q5" type="checkbox" value="G" required={true}/>
						</label>
						<label>
								<input name="q5" type="checkbox" value="H" required={true}/>
						</label>
						<p className="next" style={{left:'31.88%',top:'76.3%',width:'36.25%',height:'7.8%'}} onClick={next}></p>
					</div>
				</li>
				<li className={index == 2?'fs-current':''}>
					<div className="fs-radio-group clearfix fs-anim-lower rel">
							<img src="https://qu.xueyaun.cn/yina/rgba/Picture/survey_jianfeng_4_01.jpg"/>
							<img src="https://qu.xueyaun.cn/yina/rgba/Picture/survey_jianfeng_4_02.jpg"/>
							<label>
									<input name="q6" type="checkbox" value="A" required={true}/>
							</label>
							<label>
									<input name="q6" type="checkbox" value="B" required={true}/>
							</label>
							<label>
									<input name="q6" type="checkbox" value="C" required={true}/>
							</label>
							<label>
									<input name="q6" type="checkbox" value="D" required={true}/>
							</label>
							<label>
									<input name="q6" type="checkbox" value="E" required={true}/>
							</label>
							<label>
									<input name="q6" type="checkbox" value="F" required={true}/>
							</label>
							<label>
									<input name="q6" type="checkbox" value="G" required={true}/>
							</label>
							<label>
									<input name="q6" type="checkbox" value="H" required={true}/>
							</label>
							<label>
									<input name="q6" type="checkbox" value="I" required={true}/>
							</label>
							<label>
									<input name="q6" type="checkbox" value="J" required={true}/>
							</label>
							<label>
									<input name="q6" type="checkbox" value="K" required={true}/>
							</label>
							<label>
									<input name="q6" type="checkbox" value="L" required={true}/>
							</label>
							<p className="next tan" style={{left:'31.88%',top:'76.1%',width:'36.25%',height:'8%'}} onClick={next}></p>
					</div>
				</li>
				{
					error?<div className="fs-message-error">请将信息填写完整</div>:''
				}
				
				{
					wechatPopupVisibility?
					<WechatPopup onClose={()=>{setWechatPopupVisibility(false);onClose()}}></WechatPopup>:""
				}
				
			</div>
		</div>
	);
};

export default DouPop



