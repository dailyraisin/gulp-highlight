'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var highlight = require('./index');

it('should highlight', function (cb) {
  var stream = highlight();

  stream.on('data', function (file) {
    assert.equal(file.relative, 'file.ext');
    assert.equal(file.contents.toString(), '<code>* <span class="hljs-rules">{ <span class="hljs-rule"><span class="hljs-attribute">box-sizing</span>:<span class="hljs-value"> border-box </span></span></span>}</code>');
  });

  stream.on('end', cb);

  stream.write(new gutil.File({
    base: __dirname,
    path: 'file.ext',
    contents: new Buffer('<code>* { box-sizing: border-box }</code>')
  }));

  stream.end();
});

it('should not highlight', function (cb) {
  var stream = highlight();

  stream.on('data', function (file) {
    assert.equal(file.relative, 'file.ext');
    assert.equal(file.contents.toString(), '<code class="nohighlight">* { box-sizing: border-box }</code>');
  });

  stream.on('end', cb);

  stream.write(new gutil.File({
    base: __dirname,
    path: 'file.ext',
    contents: new Buffer('<code class="nohighlight">* { box-sizing: border-box }</code>')
  }));

  stream.end();
});

it('should highlight html', function (cb) {
  var stream = highlight();

  stream.on('data', function (file) {
    assert.equal(file.relative, 'file.ext');
    assert.equal(file.contents.toString(), '<code>&lt;<span class="hljs-keyword">div</span>&gt;html&lt;/<span class="hljs-keyword">div</span>&gt;</code>');
  });

  stream.on('end', cb);

  stream.write(new gutil.File({
    base: __dirname,
    path: 'file.ext',
    contents: new Buffer('<code><div>html</div></code>')
  }));

  stream.end();
})