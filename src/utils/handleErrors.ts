export default function sendErrorResponse(statusCode: number, title: string, detail: string) {
    return {
      "type": "about:blank",
      "title": title,
      "detail": detail,
      "instance": "/api-endpoint",
      statusCode
  }
}