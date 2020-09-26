function genListNumber(data) {
    let divList = [];
    startSkeleton(divList,data);
    genTitleContainer(divList,data);
    genSingleValue(divList,data);
    endSkeleton(divList);
    return  {widget: divList.join('')};
}