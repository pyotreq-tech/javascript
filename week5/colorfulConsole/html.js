const html = `<!doctype html>
                <html>
                <title>Colors</title>
                <form method="POST">
                <input type="text" name="text">
                <select name="color">
                    <option value="red">red</option>
                    <option value="blue">blue</option>
                    <option value="green">green</option>
                    <option value="yellow">yellow</option>
                    <option value="gray">gray</option>
                    <option value="magenta">magenta</option>
                    <option value="cyan">cyan</option>
                </select>
                <button type="submit">Go</button>
                </form>
                </html>`;

exports.text = html;
