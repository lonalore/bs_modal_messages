var Drupal = Drupal || {};

(function ($, Drupal) {
  "use strict";

  /**
   * @type {{attach: Drupal.behaviors.bsModalInit.attach}}
   */
  Drupal.behaviors.bsModalInit = {
    attach: function (context, settings) {
      $(context)
        .find('body')
        .once('bs-modal-init')
        .each(function () {
          $(this).prepend(settings.bsModal.modal);
        });
    }
  };

  /**
   * @type {{attach: Drupal.behaviors.bsModal.attach}}
   */
  Drupal.behaviors.bsModal = {
    attach: function (context, settings) {
      var $modal = $('#bsModal');
      var $customModalMessages = [];
      var $messagesHTML = '';

      $(context).find(settings.bsModal.selector).each(function (index) {
        var $this = $(this);
        var $title = $this.find('h4').detach().html();

        if ($title.length > 0) {
          $modal.find('.modal-title').html($title);
        }
        else {
          $modal.find('.modal-title').html(settings.bsModal.title);
        }

        $modal.find('.modal-footer')
          .find('.close-button')
          .html(settings.bsModal.close);

        $this.find('a.close').detach();

        $customModalMessages[index] = $this.detach().html();
      });

      if ($customModalMessages.length > 0) {
        $messagesHTML = $customModalMessages[0];
        $customModalMessages.shift();

        $modal.find('.modal-body').html($messagesHTML);
        $modal.modal();
      }
    }
  };

})(jQuery, Drupal);
