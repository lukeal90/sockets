const renderProductos = async (data) => {
    const template = await fetch('/plantilla/tabla.hbs');
    const textTemplate = await template.text();
	const functionTemplate = Handlebars.compile(textTemplate);
	const html = functionTemplate({ productos: data });
	document.querySelector('#productos').innerHTML = html;
}

const renderChat = async (data) => {
    const template = await fetch('/plantilla/messages.hbs');
    const textTemplate = await template.text();
	const functionTemplate = Handlebars.compile(textTemplate);
	const html = functionTemplate({ productos: data });
	document.querySelector('#messages').innerHTML = html;
}

module.exports = {
    renderProductos,
    renderChat
}