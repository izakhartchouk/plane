function Plane() { };

Plane.prototype.takeoff = function takeoff(callback) {
    setTimeout(function () {
        callback();
        console.log('Took off');
    }, 600);
};
Plane.prototype.closeChassis = function closeChassis(callback) {
    setTimeout(function () {
        callback();
        console.log('Chassis closed');
    }, 1000);
};
Plane.prototype.turnOnAutoPilot = function turnOnAutoPilot(callback) {
    setTimeout(function () {
        callback();
        console.log('Autopilot turned on');
    }, 750);
};
Plane.prototype.flyToDestination = function flyToDestination(callback) {
    setTimeout(function () {
        callback();
        console.log('Flown to destination');
    }, 2000);
};
Plane.prototype.openChassis = function openChassis(callback) {
    setTimeout(function () {
        callback();
        console.log('Chassis open');
    }, 500);
};
Plane.prototype.land = function land(callback) {
    setTimeout(function () {
        callback();
        console.log('Landed');
    }, 3000);
};
//DONT MODIFY ANYTHING ABOVE HERE

// START ADD YOUR CODE HERE

var queue = (function () {
    var actions = [];
    var executionStarted = false;

    function add (action) {
        actions.push(action);
        if (!executionStarted && actions.length === 1) {
            executionStarted = true;
            executeNextAction();
        }
    }

    function executeNextAction () {
        var action = actions.splice(0, 1)[0];

        if (action) {
            action(executeNextAction);
        } else {
            executionStarted = false;
        }
    }

    return {
        add: add
    };
})();

function decorate (plane) {
    var planePrototype = Plane.prototype;

    for (var propertyName in planePrototype) {
        if (planePrototype.hasOwnProperty(propertyName)) {
            plane[propertyName] = createPlaneFunctionWrapper(propertyName);
        }
    }

    function createPlaneFunctionWrapper (propertyName) {
        return function () {
            queue.add(planePrototype[propertyName]);

            return plane;
        }
    }
}

var plane = new Plane();

decorate(plane);

// END ADD YOUR CODE HERE

//DONT MODIFY ANYTHING BELOW HERE
console.log("Expected Output:");
console.log("Took off");
console.log("Chassis closed");
console.log("Autopilot turned on");
console.log("Flown to destination");
console.log("Chassis open");
console.log("Landed");

console.log("\n\nActual Output:");
plane.takeoff().closeChassis().turnOnAutoPilot().flyToDestination().openChassis().land();
