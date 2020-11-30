
function stepUp() {
    if ($('.actions .step-up')[0]) {
		$('.actions .step-up')[0].click();
	}
}
function stepDown() {
    if ($('.actions .skip')[0]) {
        $('.actions .skip')[0].click();
    }
    setTimeout(function () {
		if ($('.actions .step-down')[0]) {
			$('.actions .step-down')[0].click();
		}
    }, 400);
}

const rCreator = "creator";
const rAdmin = "admin";
const rModerator = "moderator"

const roles = [rCreator, rAdmin, rModerator];
function has(role, requiredRole) {
    return roles.indexOf(role.toLowerCase()) <= roles.indexOf(requiredRole.toLowerCase());
}

function start() {
    const target = document.getElementById('chat-messages');
    let prevUserId = "dlz7vxv2ztqu8fjqkzw57r4ln";
    function callback(mutationRecords, observer) {

        mutationRecords.forEach(mutationRecord => {
            mutationRecord.addedNodes.forEach(addedNode => {
                if(addedNode.classList.contains("alert"))
                    return

                if(addedNode.nodeName === "LI") {
                    let userId = prevUserId;
                    if(addedNode.classList.contains("named")) {
                        userId = $(addedNode).find('.name')[0].getAttribute('data-id');
                    }
                    const role = $('.users-tab .users-list .roomie[data-id="' + userId + '"] .v-center')[0].childNodes[1].innerText;
                    const content = $(addedNode).find('.content')[0].innerText;

                    switch(content) {
                        case "!up":
                            if (has(role, rModerator))
                                stepUp();
                            break;
                        case "!down":
                            if (has(role, rModerator))
                                stepDown();
                            break;
                        default:
                            break;

                    }
                    prevUserId = userId;
                }
            })
        })
    }
    const observer = new MutationObserver(callback);

    const config = {
        childList: true,
        subtree: true
    };

    observer.observe(target, config);
}
setTimeout(start, 10000);

var script = document.createElement('script');
script.textContent = '' + function confirm() { return true } + '';
(document.body||document.documentElement).appendChild(script);
script.remove();