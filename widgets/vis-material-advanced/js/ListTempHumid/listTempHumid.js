function genListTempHumid(data) {
    let divList = [];
    startSkeleton(divList,data);
    genIcon(divList,data.attr('card-icon-closed'));
    genTitleContainer(divList,data);
    genDoubleValue(divList,data);
    endSkeleton(divList);
    return  {widget: divList.join('')};
}