<template>
<svg xmlns="http://www.w3.org/2000/svg" :viewBox="viewbox" :width="w" :height="h">
<path v-if="name == 'announcement'" :fill="fill" class="heroicon-ui" d="M13 16v5a1 1 0 0 1-1 1H9l-3-6a2 2 0 0 1-2-2 2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2 0-1.1.9-2 2-2h7.59l4-4H20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2.41l-4-4H13zm0-2h1.41l4 4H20V4h-1.59l-4 4H13v6zm-2 0V8H6v2H4v2h2v2h5zm0 2H8.24l2 4H11v-4z"/>
<path v-else-if="name == 'arrow-down'" :fill="fill" class="heroicon-ui" d="M11 18.59V3a1 1 0 0 1 2 0v15.59l5.3-5.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-7-7a1 1 0 0 1 1.4-1.42l5.3 5.3z"/>
<path v-else-if="name == 'arrow-left'" :fill="fill" class="heroicon-ui" d="M5.41 11H21a1 1 0 0 1 0 2H5.41l5.3 5.3a1 1 0 0 1-1.42 1.4l-7-7a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 1.42 1.4L5.4 11z"/>
<path v-else-if="name == 'arrow-right'" :fill="fill" class="heroicon-ui" d="M18.59 13H3a1 1 0 0 1 0-2h15.59l-5.3-5.3a1 1 0 1 1 1.42-1.4l7 7a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.42-1.4l5.3-5.3z"/>
<path v-else-if="name == 'arrow-up'" :fill="fill" class="heroicon-ui" d="M13 5.41V21a1 1 0 0 1-2 0V5.41l-5.3 5.3a1 1 0 1 1-1.4-1.42l7-7a1 1 0 0 1 1.4 0l7 7a1 1 0 1 1-1.4 1.42L13 5.4z"/>
<path v-else-if="name == 'browser'" :fill="fill" class="heroicon-ui" d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm16 4V5H4v2h16zm0 2H4v10h16V9z"/>
<path v-else-if="name == 'calendar'" :fill="fill" class="heroicon-ui" d="M17 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h2V3a1 1 0 1 1 2 0v1h6V3a1 1 0 0 1 2 0v1zm-2 2H9v1a1 1 0 1 1-2 0V6H5v4h14V6h-2v1a1 1 0 0 1-2 0V6zm4 6H5v8h14v-8z"/>
<path v-else-if="name == 'code'" :fill="fill" class="heroicon-ui" d="M20.59 12l-3.3-3.3a1 1 0 1 1 1.42-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.42-1.4l3.3-3.3zM3.4 12l3.3 3.3a1 1 0 0 1-1.42 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.42 1.4L3.4 12zm7.56 8.24a1 1 0 0 1-1.94-.48l4-16a1 1 0 1 1 1.94.48l-4 16z"/>
<path v-else-if="name == 'cog'" :fill="fill" class="heroicon-ui" d="M9 4.58V4c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v.58a8 8 0 0 1 1.92 1.11l.5-.29a2 2 0 0 1 2.74.73l1 1.74a2 2 0 0 1-.73 2.73l-.5.29a8.06 8.06 0 0 1 0 2.22l.5.3a2 2 0 0 1 .73 2.72l-1 1.74a2 2 0 0 1-2.73.73l-.5-.3A8 8 0 0 1 15 19.43V20a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.58a8 8 0 0 1-1.92-1.11l-.5.29a2 2 0 0 1-2.74-.73l-1-1.74a2 2 0 0 1 .73-2.73l.5-.29a8.06 8.06 0 0 1 0-2.22l-.5-.3a2 2 0 0 1-.73-2.72l1-1.74a2 2 0 0 1 2.73-.73l.5.3A8 8 0 0 1 9 4.57zM7.88 7.64l-.54.51-1.77-1.02-1 1.74 1.76 1.01-.17.73a6.02 6.02 0 0 0 0 2.78l.17.73-1.76 1.01 1 1.74 1.77-1.02.54.51a6 6 0 0 0 2.4 1.4l.72.2V20h2v-2.04l.71-.2a6 6 0 0 0 2.41-1.4l.54-.51 1.77 1.02 1-1.74-1.76-1.01.17-.73a6.02 6.02 0 0 0 0-2.78l-.17-.73 1.76-1.01-1-1.74-1.77 1.02-.54-.51a6 6 0 0 0-2.4-1.4l-.72-.2V4h-2v2.04l-.71.2a6 6 0 0 0-2.41 1.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
<path v-else-if="name == 'discord'" :fill="fill"  d="M40 12s-4.586-3.59-10-4l-.488.977C34.406 10.176 36.652 11.89 39 14c-4.047-2.066-8.04-4-15-4-6.96 0-10.953 1.934-15 4 2.348-2.11 5.02-4.016 9.488-5.023L18 8c-5.68.535-10 4-10 4s-5.121 7.426-6 22c5.16 5.953 13 6 13 6l1.64-2.184C13.856 36.848 10.716 35.121 8 32c3.238 2.45 8.125 5 16 5s12.762-2.55 16-5c-2.715 3.121-5.855 4.848-8.64 5.816L33 40s7.84-.047 13-6c-.879-14.574-6-22-6-22zM17.5 30c-1.934 0-3.5-1.79-3.5-4s1.566-4 3.5-4 3.5 1.79 3.5 4-1.566 4-3.5 4zm13 0c-1.934 0-3.5-1.79-3.5-4s1.566-4 3.5-4 3.5 1.79 3.5 4-1.566 4-3.5 4z"/>
<path v-else-if="name == 'download'" :fill="fill" class="heroicon-ui" d="M11 14.59V3a1 1 0 0 1 2 0v11.59l3.3-3.3a1 1 0 0 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 1.4-1.42l3.3 3.3zM3 17a1 1 0 0 1 2 0v3h14v-3a1 1 0 0 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z"/>
<path v-else-if="name == 'duplicate'" :fill="fill" class="heroicon-ui" d="M17 7h2.25c.97 0 1.75.78 1.75 1.75v10.5c0 .97-.78 1.75-1.75 1.75H8.75C7.78 21 7 20.22 7 19.25V17H4.75C3.78 17 3 16.22 3 15.25V4.75C3 3.78 3.78 3 4.75 3h10.5c.97 0 1.75.78 1.75 1.75V7zm-2 0V5H5v10h2V8.75C7 7.78 7.78 7 8.75 7H15zM9 9v10h10V9H9z"/>
<path v-else-if="name == 'exclamation'" :fill="fill" class="heroicon-ui" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 9a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
<path v-else-if="name == 'extern'" :fill="fill" class="heroicon-ui" d="M19 6.41L8.7 16.71a1 1 0 1 1-1.4-1.42L17.58 5H14a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V6.41zM17 14a1 1 0 0 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h5a1 1 0 0 1 0 2H5v12h12v-5z"/>
<path v-else-if="name == 'hashtag'" :fill="fill" class="heroicon-ui" d="M11.03 8h3.94l1.06-4.24a1 1 0 1 1 1.94.48L17.03 8H20a1 1 0 0 1 0 2h-3.47l-1 4H18a1 1 0 1 1 0 2h-2.97l-1.06 4.25a1 1 0 1 1-1.94-.49l.94-3.76H9.03l-1.06 4.25a1 1 0 1 1-1.94-.49L6.97 16H4a1 1 0 0 1 0-2h3.47l1-4H6a1 1 0 0 1 0-2h2.97l1.06-4.24a1 1 0 1 1 1.94.48L11.03 8zm-.5 2l-1 4h3.94l1-4h-3.94z"/>
<path v-else-if="name == 'heart'" :fill="fill" class="heroicon-ui" d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z"/>
<path v-else-if="name == 'help'" :fill="fill" class="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM10.59 8.59a1 1 0 1 1-1.42-1.42 4 4 0 1 1 5.66 5.66l-2.12 2.12a1 1 0 1 1-1.42-1.42l2.12-2.12A2 2 0 0 0 10.6 8.6zM12 18a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
<path v-else-if="name == 'minus'" :fill="fill" class="heroicon-ui" d="M17 11a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2h10z"/>
<path v-else-if="name == 'news'" :fill="fill" class="heroicon-ui" d="M18 21H7a4 4 0 0 1-4-4V5c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2h2a2 2 0 0 1 2 2v11a3 3 0 0 1-3 3zm-3-3V5H5v12c0 1.1.9 2 2 2h8.17a3 3 0 0 1-.17-1zm-7-3h4a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zm0-4h4a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zm0-4h4a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2zm9 11a1 1 0 0 0 2 0V7h-2v11z"/>
<path v-else-if="name == 'plus'" :fill="fill" class="heroicon-ui" d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/>
<path v-else-if="name == 'search'" :fill="fill" class="heroicon-ui" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/>
<path v-else-if="name == 'x'" :fill="fill" class="heroicon-ui" d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"/>
</svg>
</template>

<script>
export default {
    name: 'Icon',
    props: {
        'name': {
            type: String,
            default: 'help'
        },
        'w': {
            type: Number,
            default: 24
        },
        'h': {
            type: Number,
            default: 24
        },
        'fill': {
            type: String,
            default: '#fff'
        },
        'viewbox': {
            type: String,
            default: '0 0 24 24'
        }
    }
}
</script>