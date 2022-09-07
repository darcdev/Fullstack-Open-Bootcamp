export interface HomeParams {
    title: string
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CoursePartDescription extends CoursePartBase {
    description: string;
}

interface CourseNormalPart extends CoursePartDescription {
    type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartDescription {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseSpecial extends CoursePartDescription {
    type: "special";
    requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecial

export interface ContentParams {
    courseParts: CoursePart[]
}