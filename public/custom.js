function enhsli_range(el, change) {
  const $el = $(el);
  const $num = $el.next().next().next();
  $num.val($el.val());
  if (change) $num.trigger("change");
}

function enhsli_number(el) {
  const $el = $(el);
  const $rng = $el.prev().prev().prev();
  $rng.val($el.val());
}
