import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  CourseReview,
  CourseAdded,
  ReviewAdded
} from "../generated/CourseReview/CourseReview"
import { Course, Review } from "../generated/schema"

export function handleCourseAdded(event: CourseAdded): void {
  let course = new Course(event.params.courseId.toString())
  course.name = event.params.name
  course.description = event.params.description
  course.save()
}

export function handleReviewAdded(event: ReviewAdded): void {
  let reviewId = event.params.courseId.toString() + "-" + event.logIndex.toString()
  let review = new Review(reviewId)
  review.course = event.params.courseId.toString()
  review.rating = event.params.rating.toI32()
  review.comment = event.params.comment
  review.studentAddress = event.params.studentAddress
  review.save()
}