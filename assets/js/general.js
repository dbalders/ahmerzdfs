function fluidBoxInit() {
    $('.home-lineup-container a')
        .on('openstart.fluidbox', function() {
            $('.home-button').hide();
        })
        .on('closestart.fluidbox', function() {
            $('.home-button').show();
        })
        .fluidbox({
            viewportFill: 0.8,
        });
}
