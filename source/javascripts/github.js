var github = {
  showRepos: function(options) {
    this.options = options;
    this._getData();
  },
  _getData: function() {
    $.getJSON("https://api.github.com/users/"+this.options.user+"/repos?type=owner&sort=pushed&callback=?", $.proxy(this._getDataCallback, this));
  },
  _getDataCallback: function(data) {
    var repos = [];
    if (!data || !data.data) { return; }

	var i = 0;
	while (i < data.data.length && repos.length < data.data.length) {
      if (!(this.options.skip_forks && data.data[i].fork)) {
    	if (!data.data[i].name.match(/\.github.com/)) {
      		repos.push(data.data[i]);
	  	}
	  }
	  i++;
    }
    repos.sort(function(a, b) {
      var aDate = new Date(a.pushed_at).valueOf(),
          bDate = new Date(b.pushed_at).valueOf();

      if (aDate === bDate) { return 0; }
      return aDate > bDate ? -1 : 1;
    });

    if (this.options.count) { repos.splice(this.options.count); }
    this._render(this.options.target, repos);
  },
  _render: function(target, repos) {
    var i = 0, fragment = '', t = $(target)[0];

    for (i = 0; i < repos.length; i++) {
      fragment += '<dt><a href="'+repos[i].html_url+'">'+repos[i].name+'</a><a rel="tooltip" href="'+repos[i].html_url+'" title="open sourced at Github"></a></dt><dd>'+(repos[i].description||'&nbsp;')+'</p></dd>';
    }
    t.innerHTML = fragment;
  }
};