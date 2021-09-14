export const orderEmail = (items) => {
  let sum = 0
  let html = ""
  items.forEach((item) => {
    sum = sum + item.price
  })
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          *{
              font-family: system-ui;
          }
          .container{
              max-width: 900px;
              margin-left: auto;
              margin-right: auto;
              background: white;
          }
          .header{
              background: #DB163A;
              color: white;
              text-align: center;
              padding: 1rem;
              font-weight: bold;
              font-size: 2rem;
          }

          table {
              font-family: arial, sans-serif;
              border-collapse: collapse;
              width: 100%;
          }

          td, th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
          }
              
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <div class="logo">MyEshop</div>
          </div>
          <div class="main">
              <table>
                  <tr>
                    <th>Ονομα</th>
                    <th>Τιμή</th>
                    <th>Ποσότητα</th>
                    <th>Τιμή με Φ.Π.Α
                  </th>
                  </tr>
                  ${items.map((item) => {
                    html = `<tr>
                      <td>${item.name}</td>
                      <td>${item.price}€</td>
                      <td>1</td>
                      <td>${item.price}€</td>
                  </tr>`
                    return html
                  })}
              </table>
                
          </div>
          <div class="header">
              <div class="totalPrice">Σύνολο: ${sum}€</div>
          </div>
      </div>
  </body>
  </html>`
}
