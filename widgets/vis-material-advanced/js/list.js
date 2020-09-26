function genIcon(divList, icon) {

    divList.push('<div class="vma_picture"> ');
    divList.push('<img class="vma_icon" src="' + icon + '"></div>');

}

function genTitleContainer(divList, data) {

    divList.push('<div class="vma_title_subtitle_container" style="color:' + data.TextColor + '; ">');
    divList.push('<div  class="vma_title" style="font-size: ' + data.titleSize + ';">');
    divList.push(data.title);
    divList.push('</div><div  class="vma_subtitle" style=" color: ' + data.TextColor + ';font-size: ' + data.subtitleSize + ' ">');
    if (typeof data.subtitle == 'undefined') {
        divList.push('</div></div>');
    }
    else {
        divList.push(data.subtitle + '</div></div>');
    }
    return { widget: divList.join('') }
}


function genSingleValue(divList, data) {
    divList.push('<div  class="vma_value_container">  ');
    divList.push('<div  class="vma_value"   style="color:  ' + data.TextColor + '; text-align:' + data.attr('value-align') + '; vertical-align:' + data.attr('value-vertical') + ';" >');
    divList.push('</div></div>');
    divList.push('<div class="vma_overlay ms-button-op vis-widget-body" ></div>');
    //return {widget: divList.join('')}
}

function genDoubleValue(divList, data) {
    divList.push('<div  class="vma_value_container">  ');
    divList.push('<div  class="vma_value2_1"   style="color:  ' + data.TextColor + '; text-align:' + data.attr('value-align') + '; vertical-align:' + data.attr('value-vertical') + ';" >');
    divList.push('</div>');
    divList.push('<div  class="vma_value2_2"   style="color:  ' + data.TextColor + '; text-align:' + data.attr('value-align') + '; vertical-align:' + data.attr('value-vertical') + ';" >');
    divList.push('</div></div>');
    divList.push('<div class="vma_overlay ms-button-op vis-widget-body" ></div>');
    //return {widget: divList.join('')}
}

function genSliderValue(divList,data) {    
    divList.push('<div  class="vma_value_container">  ');
    divList.push('<div  class="vma_value"   style="color:  ' + data.TextColor + '; text-align:' + data.attr('value-align') + '; vertical-align:' + data.attr('value-vertical') + ';" >');
    if ( !data.readOnly) {
        divList.push('<div class="sliderJQUI" id="'+ data.attr('wid') +'_slider" ');
        divList.push(' data-oid="'+ data.attr('oid') +'" data-oid2="'+ data.attr('oid-2') +'" data-oid-working="'+ data.attr('oid-working') +'"  , ');
        divList.push('data-oid2-working="'+ data.attr('oid-2-working') +'"');
        divList.push(  vis.binds.jqueryui.slider({min:0,max:100,step:1,inverted:false}) +'/>');
        
        divList.push('</div><label for="'+ data.attr('wid') +'_checkbox"><label>');
    }    
    divList.push('</div></div>');
    divList.push('<div class="vma_overlay ms-button-op vis-widget-body" ></div>');
}

function genButtonValue(divList,data) {
    divList.push('<div  class="vma_value_container">  ');
    divList.push('<div  class="vma_value"   style="color:  ' + data.TextColor + '; text-align:' + data.attr('value-align') + '; vertical-align:' + data.attr('value-vertical') + ';" >');
    if ( !data.readOnly) {
        divList.push('<label class="vma-switch">');
        divList.push(' <input type="checkbox" checked="" name="'+ data.attr( 'wid') +'_checkbox" id="'+ data.attr('wid') +'_checkbox"  data-oid="'+ data.attr('oid')+'">  ');
        divList.push('<span class="vma-slider-switch round"></span>');
    }    
    divList.push('</div></div>');
    divList.push('<div class="vma_overlay ms-button-op vis-widget-body" ></div>');
}

function startSkeleton(divList,data){
    // divList.push('<div class="vis-widget susi mdw-list vma_outer_div '+ data.attr( 'class') +'" id="'+ data.attr('wid') +'" ');
    // divList.push('style="background-color:'+ data.attr('widget-background') +';"></div>');
    divList.push('<div class="vis-widget-body vma_inner_container_div"  > ');    
}

function endSkeleton(divList){
    divList.push('</div>');
}
function endSkeletonSlider() {
    divList.push('<div class="vma_overlay ms-button-op vis-widget-body" ></div>');
    divList.push('</div>');
}
