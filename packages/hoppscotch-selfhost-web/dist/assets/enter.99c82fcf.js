import{_ as a,o as e,d as i,bd as p,f as d,D as _,cS as f,aR as C,c as o,t as h,s as u,cp as m}from"./index.d0a044cd.js";const g={},y={xmlns:"http://www.w3.org/2000/svg",width:"512",height:"512",viewBox:"0 0 512 512",fill:"none"},w=p('<rect width="512" height="512" fill="#10B981"></rect><circle cx="197.76" cy="157.84" r="10" fill="white" fill-opacity="0.75"></circle><circle cx="259.76" cy="161.84" r="12" fill="white" fill-opacity="0.75"></circle><circle cx="319.76" cy="177.84" r="10" fill="white" fill-opacity="0.75"></circle><path d="M344.963 235.676C347.038 222.978 306.091 205.872 253.996 197.582C201.906 189.286 157.592 192.917 155.516 205.615C155.259 206.65 155.516 207.427 155.779 208.468C154.481 207.947 79.0651 419.68 79.0651 419.68H364.139C364.139 419.68 346.518 238.266 343.928 238.266C344.443 237.494 344.963 236.717 344.963 235.676Z" fill="url(#paint0_linear_106_2)"></path><path d="M314.902 227.386C313.604 235.419 284.063 237.231 248.559 231.788C213.312 226.088 185.577 214.945 186.875 207.17C187.396 204.58 190.763 202.505 196.206 201.47C178.065 202.247 166.144 205.615 165.11 211.315C163.555 221.943 199.836 236.454 246.483 243.972C293.13 251.484 332.265 248.637 334.077 238.272C335.118 232.046 324.747 225.311 307.646 218.833C312.569 221.68 315.159 224.79 314.902 227.386Z" fill="#A7F3D0" fill-opacity="0.5"></path><path d="M333.557 157.413C330.453 125.276 305.828 98.0618 272.657 92.8821C239.485 87.6965 208.126 105.837 194.908 135.121C216.159 136.419 238.965 138.752 262.812 142.639C288.208 146.527 312.049 151.713 333.557 157.413Z" fill="url(#paint1_radial_106_2)"></path><path d="M74.1425 158.002C71.5527 173.81 104.461 193.249 156.036 209.057C155.779 208.017 155.779 207.239 155.779 206.204C157.849 193.506 201.906 189.876 254.259 198.172C306.606 206.462 347.296 223.568 345.22 236.266C344.963 237.306 344.706 238.084 344.185 238.855C397.83 239.633 435.153 231.343 437.742 215.535C441.367 191.431 363.104 159.037 262.812 143.229C162.257 127.421 77.7672 133.898 74.1425 158.002ZM189.728 156.704C190.506 152.559 194.393 149.449 198.538 150.227C202.683 151.004 205.794 154.892 205.016 159.037C204.496 163.182 200.351 166.035 196.206 165.515C192.061 164.737 188.951 160.849 189.728 156.704ZM249.594 160.849C250.371 155.149 255.814 151.262 261.514 152.302C267.214 153.08 271.102 158.517 270.067 164.223C269.026 169.665 263.589 173.553 258.147 172.776C252.441 171.998 248.553 166.555 249.594 160.849ZM312.569 176.143C313.347 171.998 317.234 168.888 321.379 169.665C325.524 170.443 328.634 174.331 327.857 178.476C327.342 182.621 323.192 185.731 319.047 184.953C314.902 184.176 311.791 180.288 312.569 176.143Z" fill="url(#paint2_radial_106_2)"></path><defs><linearGradient id="paint0_linear_106_2" x1="224.998" y1="157.606" x2="224.998" y2="403.696" gradientUnits="userSpaceOnUse"><stop stop-color="#86EFAC" stop-opacity="0.75"></stop><stop offset="0.635417" stop-color="white" stop-opacity="0.2"></stop><stop offset="1" stop-color="white" stop-opacity="0"></stop></linearGradient><radialGradient id="paint1_radial_106_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(264.232 124.706) rotate(90) scale(32.7063 69.3245)"><stop stop-color="#047857"></stop><stop offset="1" stop-color="#064E3B"></stop></radialGradient><radialGradient id="paint2_radial_106_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(255.837 186.754) scale(1389.61 1389.61)"><stop stop-color="#047857"></stop><stop offset="0.114583" stop-color="#064E3B"></stop></radialGradient></defs>',9),x=[w];function M(t,n){return e(),i("svg",y,x)}const $=a(g,[["render",M]]),r=d({setup(){return{t:_()}},data(){return{signingInWithEmail:!1,error:null}},beforeMount(){f()},async mounted(){this.signingInWithEmail=!0;try{await C.auth.processMagicLink()}catch(t){this.error=t.message}finally{this.signingInWithEmail=!1}}}),s={},k={class:"flex flex-col items-center justify-center min-h-screen"},E={key:2,class:"mt-4 text-secondaryLight"};function S(t,n,B,Z,G,U){const c=m,l=$;return e(),i("div",k,[t.signingInWithEmail?(e(),o(c,{key:0})):(e(),o(l,{key:1,class:"w-16 h-16 rounded"})),t.error?(e(),i("pre",E,h(t.error),1)):u("",!0)])}typeof s=="function"&&s(r);const v=a(r,[["render",S]]);export{v as default};
//# sourceMappingURL=enter.99c82fcf.js.map
