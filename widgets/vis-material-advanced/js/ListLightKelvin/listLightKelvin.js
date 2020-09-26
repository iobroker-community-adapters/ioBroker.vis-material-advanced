function genListLightKelvin(data) {
    let divList = [];
    startSkeleton(divList,data);
    genIcon(divList,data.attr('card-icon-warmwhite'));
    genTitleContainer(divList,data);
    //genSliderValue(divList,data);
    //endSkeleton(divList);
    return  {widget: divList.join('')};
}