function genListLightDim(data) {
    let divList = [];
    startSkeleton(divList,data);
    genIcon(divList,data.attr('card-icon-on'));
    genTitleContainer(divList,data);
    //genSliderValue(divList,data);
    //endSkeleton(divList);
    return  {widget: divList.join('')};
}