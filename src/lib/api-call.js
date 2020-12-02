export class ApiCall {
  static get(url, params) {
    return fetch(
      url + new URLSearchParams(params).toString(),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-authorize': 'FetchFromCookie'
        },
      }
    ).then(ApiCall.handleResponseCallBack);
  }

  static post(url, body) {
    return fetch(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-authorize': 'FetchFromCookie'
        },
        body: JSON.stringify(body)
      }
    ).then(ApiCall.handleResponseCallBack);
  }

  static put(url, body) {
    return fetch(
      url,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-authorize': 'FetchFromCookie'
        },
        body: JSON.stringify(body)
      }
    ).then(ApiCall.handleResponseCallBack);
  }

  static remove(url, body) {
    return fetch(
      url,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-authorize': 'FetchFromCookie'
        },
        body: JSON.stringify(body)
      }
    ).then(ApiCall.handleResponseCallBack);
  }

  static handleResponseCallBack(res) {
    if (res.ok === false) {
      throw new Error(res.statusText);
    }

    return res.json();
  }
}
