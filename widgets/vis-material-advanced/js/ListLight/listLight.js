function genListLight(data) {
    let divList = [];
    startSkeleton(divList,data);
    genIcon(divList,data.attr('card-icon-on'));
    genTitleContainer(divList,data);
    genButtonValue(divList,data);
    endSkeleton(divList);
    return  {widget: divList.join('')};
}