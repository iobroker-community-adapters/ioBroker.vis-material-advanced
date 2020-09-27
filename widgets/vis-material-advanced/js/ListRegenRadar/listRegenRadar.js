function genListRegenRadar(data) {
    let divList = [];
    startSkeleton(divList,data);
    //genIcon(divList,data.attr('card-icon'));
    //genTitleContainer(divList,data);
    genSingleImageValue(divList,data);
    endSkeleton(divList);
    var html = divList.join('');
    return  {widget: divList.join('')};
}