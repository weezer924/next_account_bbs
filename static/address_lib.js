class Lib {
  static deepcopy(val) {
    return JSON.parse(JSON.stringify(val))
  }

  static encodeEmail(val) {
    return val.split(".").join("*")
  }

  static decodeEmail(val) {
    return val.split("*").join(".")
  }
}

export default Lib;