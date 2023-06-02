# css-media-queries-to-classes

```npm install```

Add file to ``input.css`` e.g.

``@media (min-width:576px) {
    .text-red {
        color: red!important;
    }
}``

Run ``node transform.js``

..get replacement of media query as classname as defined in ``breakpoints`` object:

``
.breakpoint-sm .text-red {
    color: red!important;
}
``