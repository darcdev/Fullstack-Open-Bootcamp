export interface HomeParams {
    title: string
}

export interface Course {
    name: string,
    exerciseCount: number
}
export interface ContentParams {
    courseParts: Course[]
}