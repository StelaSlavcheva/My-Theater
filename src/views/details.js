import { html } from '../../node_modules/lit-html/lit-html.js';
import { delETE, getById } from '../api/data.js';

const detailsTemplate = (theater, isOwner, onDelete) => html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${theater.title}</h1>
            <div>
                <img src=${theater.imageUrl}/>
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${theater.description}</p>
            <h4>Date: ${theater.date}</h4>
            <h4>Author: ${theater.author}</h4>
            ${ isOwner
            ? html ` <div class="buttons">
                <a @click = ${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
                <a class="btn-edit" href="/edit/${theater._id}">Edit</a>
                <a class="btn-like" href="/like/${theater._id}">Like</a>
            </div> `
            : ''}
            <p class="likes">Likes: 0</p>
        </div>
    </div>
</section>`;

export async function detailsPage(ctx){

    const userId = sessionStorage.getItem('userId');
    const theaterId = ctx.params.id;
    const theater = await getById(theaterId);
    const isOwner = userId === theater._ownerId
    ctx.render(detailsTemplate(theater, isOwner, onDelete));

    
    async function onDelete(){
        const confirmed = confirm ('Are you sure?');

        if(confirmed){
            await delETE(theaterId);
            ctx.page.redirect('/')
        }
    }
}