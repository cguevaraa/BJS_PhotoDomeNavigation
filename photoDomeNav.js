    const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera(
        "Camera",
        -Math.PI / 2,
        Math.PI / 2,
        5,
        BABYLON.Vector3.Zero(),
        scene
    );
    camera.attachControl (canvas, true);
    camera.inputs.attached.mousewheel.detachControl(canvas);

    const images = {
        url: [
        "https://dl.dropbox.com/s/710flojvo8ozhsg/0001.jpg",
        "https://dl.dropbox.com/s/q755i5xedpxaegz/0002.jpg",
        "https://dl.dropbox.com/s/v87xklv1dgirh6d/0003.jpg",
        "https://dl.dropbox.com/s/7an3g133p9rhla8/0004.jpg",
        "https://dl.dropbox.com/s/mf7hndsn7ui6va5/0005.jpg",
        ],
    };

    // Create the spheres
    const domes = [];

    for (let i = 0; i < images.url.length; i++) {
        domes[i] = new BABYLON.PhotoDome(
        `dome${i}`,
        images.url[i],
        {
            resolution: 32,
            size: 1000,
        },
        scene
        );
        domes[i].position.x = i * -1000;
    }

    // Uncomment this line to see the spheres' position
    // camera.position = new BABYLON.Vector3(0,5000,0);

    // Hotspots
    const planes = [];
    const buttons = [];
    const advTexs = [];

    for (let i = 0; i < images.url.length; i++) {
        planes[i] = BABYLON.Mesh.CreatePlane("plane", 100);
        planes[i].parent = domes[i];
        planes[i].position.y = 1;
        planes[i].position.x = -450;
        planes[i].rotation.y = -Math.PI / 2;

        advTexs[i] = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(planes[i]);

        buttons[i] = BABYLON.GUI.Button.CreateSimpleButton(
        `button${i}`,
        "Click to move"
        );
        buttons[i].width = 30;
        buttons[i].height = 4;
        buttons[i].color = "white";
        buttons[i].fontSize = 100;
        buttons[i].background = "black";
        buttons[i].onPointerUpObservable.add(() => {
        camera.position = domes[i + 1].position;
        camera.target = domes[i + 1].position;
        });

        advTexs[i].addControl(buttons[i]);
    }

    return scene;
    };
