import { warnMessages } from "@/constants";

export default function Validation(data) {
  function isValidUrl(url) {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url);
  }

  function validate() {
    const errors = [];

    const validations = [
      {
        condition: !data?.title || data.title.trim().length < 4,
        message: warnMessages.form.title,
      },
      {
        condition: !data?.volume || isNaN(data.volume),
        message: warnMessages.form.volume,
      },
      {
        condition: !data?.cover || !isValidUrl(data.cover),
        message: warnMessages.form.cover,
      },
      { condition: !data?.publishedAt, message: warnMessages.form.publishedAt },
      { condition: !data?.country, message: warnMessages.form.country },
      { condition: !data?.language, message: warnMessages.form.language },
      {
        condition: !data?.resourceType,
        message: warnMessages.form.resourceType,
      },
      {
        condition: !data?.source || !isValidUrl(data.source),
        message: warnMessages.form.source,
      },
      {
        condition: !data?.summary || data.summary.trim() === "",
        message: warnMessages.form.summary,
      },
      {
        condition: !data?.authors || data.authors.length === 0,
        message: warnMessages.form.authors,
      },
      {
        condition: !data?.keywords || data.keywords.length === 0,
        message: warnMessages.form.keywords,
      },
    ];

    validations.forEach(({ condition, message }) => {
      if (condition) errors.push(message);
    });

    if (errors.length > 0) {
      return errors;
    }

    return true;
  }

  return { validate };
}
