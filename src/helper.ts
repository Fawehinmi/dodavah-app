const helper = {
  shortName: (val: any) => {
    if (!val || val.length == 0) return "";

    const splt = val.split(" ");
    return `${splt[0][0]}${splt.length > 1 ? splt[1][0] || "" : ""}`;
  },
};


export default helper;
