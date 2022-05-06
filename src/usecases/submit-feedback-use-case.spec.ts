import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Sumit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "exemple comment",
        screenshot: "data:image/png;base64,ddddddddd",
      })
    ).resolves.not.toThrow();
  });

  expect(createFeedbackSpy).toHaveBeenCalled();
  expect(sendMailSpy).toHaveBeenCalled();
});

it("should not be able to submit feedback without type", async () => {
  await expect(
    submitFeedback.execute({
      type: "",
      comment: "exemple comment",
      screenshot: "data:image/png;base64,ddddddddd",
    })
  ).rejects.toThrow();
});

it("should not be able to submit feedback without comment", async () => {
  await expect(
    submitFeedback.execute({
      type: "BUG",
      comment: "",
      screenshot: "data:image/png;base64,ddddddddd",
    })
  ).rejects.toThrow();
});

it("should not be able to submit feedback with an invalid screenshot", async () => {
  await expect(
    submitFeedback.execute({
      type: "BUG",
      comment: "teste",
      screenshot: "data:image/xml;base64,ddddddddd",
    })
  ).rejects.toThrow();
});
