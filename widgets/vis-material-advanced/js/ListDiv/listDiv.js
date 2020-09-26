
function genListDiv(data) {
    let divList = [];
    genIcon(divList,data.attr('card-icon-closed'));
    genTitleContainer(divList,data);
    genSingleValue(divList,data);
    return  {widget: divList.join('')};
}
