Trak.Views.Comments = Backbone.CompositeView.extend({
  template: JST['feature/comments/comments'],
  className: 'comments-top',

  initialize: function() {
    //PH - can't fetch on the render -- it'll set off a render on the composite view, which will call render on this again... remember it rendered 4520 times before the browser triggered the success callback
    //Can't put it in initialize again.. the composite view initializes this view!
    //So I stop listening to sync. But i kinda have to on the task line-item, else the task titles can get out of line with the feature page. I ajax it instead -- only fetch the associated comments
    //PH** ima fetch the model here -- should pass down the comment items. Displays nothing til then. This page never re-renders (until you click another task of course), so no worries about constantly re-fetching things
    //PH**** - what about fetching comments from users not in your view yet?
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.populateCommentNew();
    this.populateCommentsIndex();

    return this;
  },

  populateCommentNew: function() {
    var commentNewView = new Trak.Views.CommentNew({
      collection: this.model.comments(),
      model: new Trak.Models.Comment({ task_id: this.model.id }),
    });

    this.addSubview('div.new-comment-container', commentNewView);
  },

  populateCommentsIndex: function() {
    var commentsIndexView = new Trak.Views.CommentsIndex({
      collection: this.model.comments()
    });

    this.addSubview('div.comments-index-container', commentsIndexView);
  },

})