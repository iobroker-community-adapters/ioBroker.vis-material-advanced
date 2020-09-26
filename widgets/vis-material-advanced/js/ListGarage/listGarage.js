function genListGarage(data) {
    let divList = [];
    startSkeleton(divList,data);
    genIcon(divList,data.attr('card-icon-closed'));
    genTitleContainer(divList,data);
    genSingleValue(divList,data);
    endSkeleton(divList);
    return  {widget: divList.join('')};
}