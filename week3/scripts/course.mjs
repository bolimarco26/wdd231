const byuiCourse = {
    code: "CSE 111",
    name: "Programming with Functions",
    sections: [
        {
            sectionNum: 1,
            enrolled: 25,
            days: "MWF",
            instructor: "Brother Jones"
        },
        {
            sectionNum: 2,
            enrolled: 30,
            days: "TTh",
            instructor: "Sister Smith"
        },
        {
            sectionNum: 3,
            enrolled: 28,
            days: "MWF",
            instructor: "Brother Brown"
        }
    ],

    changeEnrollment(sectionNum, add = true) {
        const section = this.sections.find(
            (section) => section.sectionNum === sectionNum
        );

        if (section) {
            if (add) {
                section.enrolled++;
            } else {
                section.enrolled--;
            }
        }
    }
};

export default byuiCourse;