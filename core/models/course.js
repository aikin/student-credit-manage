function Course(courseId, courseName, credit, type, passLine) {

    this.id       = courseId;
    this.name     = courseName;
    this.credit   = credit;
    this.type     = type;
    this.passLine = passLine;
}


module.exports = Course;