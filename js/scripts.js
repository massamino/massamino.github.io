window.addEventListener('load', function() {
	let svgs = document.querySelectorAll('.svg-chart');
	let ns = "http://www.w3.org/2000/svg";
	let radius = 11;
	let svgsize = 30;

	for(let i = 0; i < svgs.length; i++) {
		let svg = svgs[i];
		svg.setAttribute("viewBox", "0 0 " + svgsize + " " + svgsize);

		//svg.addEventListener('mouseenter', function(){
			//document.title = (this.dataset.value);
		//});

		if(svg.dataset.value != null && svg.dataset.max != null) {
			let perc = svg.dataset.value / svg.dataset.max;
			let len = Math.PI * (radius * 2);

			let dash = perc * len;

			let g = document.createElementNS(ns, "g");
			g.setAttributeNS(null, 'transform', 'translate(' + (svgsize/2) + ',' + (svgsize/2) + ') rotate(-90)');

			let gscale = this.document.createElementNS(ns, "g");
			gscale.classList.add('meter');

			let circlebase = document.createElementNS(ns, "circle");
			circlebase.setAttributeNS(null, 'r', radius);
			circlebase.classList.add('base');

			gscale.appendChild(circlebase);

			let circleval = document.createElementNS(ns, "circle");

			circleval.setAttributeNS(null, 'r', radius);
			//circleval.setAttributeNS(null, 'cx', '50%');
			//circleval.setAttributeNS(null, 'cy', '50%');
			circleval.classList.add('value');
			circleval.style.strokeDasharray = len;
			circleval.style.strokeDashoffset = len - dash;

			gscale.appendChild(circleval);
			g.appendChild(gscale);

			svgs[i].appendChild(g);

			/*let popuptextbg = this.document.createElementNS(ns, "circle");
			popuptextbg.setAttributeNS(null, 'cx', svgsize/2);
			popuptextbg.setAttributeNS(null, 'cy', svgsize/2);
			popuptextbg.setAttributeNS(null, 'r', radius + 1);
			popuptextbg.classList.add('basebg');

			svgs[i].appendChild(popuptextbg);*/

			let popuptext = document.createElementNS(ns, "text");
			popuptext.setAttributeNS(null, 'x', svgsize/2);
			popuptext.setAttributeNS(null, 'y', (svgsize/2) - (radius / 10));
			popuptext.textContent = perc*100;
			popuptext.classList.add('base');

			svgs[i].appendChild(popuptext);

			let popuptext2 = document.createElementNS(ns, "text");
			popuptext2.setAttributeNS(null, 'x', svgsize/2);
			popuptext2.setAttributeNS(null, 'y', (svgsize/2) + (radius / 1.35));
			popuptext2.textContent = '%';
			popuptext2.classList.add('base');
			popuptext2.classList.add('basesmall');

			svgs[i].appendChild(popuptext2);
		}
	}
});