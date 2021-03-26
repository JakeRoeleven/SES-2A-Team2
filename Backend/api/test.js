const {spawn} = require('child_process');

// Keep a track of time it takes for python to execute
console.time('Spawn Child Script');

// Looks like env path from python is py on my local machine
try {

    const pyProcess = spawn('python3', ['./recommendation/subject_randomiser.py']);

    console.log(pyProcess );
    console.log('worked?');

    // Define a variable to write python data to
    let data_out = '';

    console.log('here');

    // Node receives data from python
    pyProcess.stdout.on('data', async function (data) {
        console.log("data")
        data_out = await data.toString('utf8');
        console.log( data_out);
    });

    // Node receives err from python
    pyProcess.stderr.on('data', async function (data) {
        console.log('erroe');
        console.log(data.toString());
        data_out += data.toString();
    });

    // When python script ends
    pyProcess.stdout.on('end', async function () {
        console.log('end');
        console.timeEnd('Spawn Child Script');
        try {
            console.log(typeof data_out);
            let t = await JSON.parse(data_out);
            console.log(await t);
        } catch (error) {
            console.log(data_out);
        }
    });
    
} catch (e) {
    console.log(e);
}

spawn('python3', ['./recommendation/test2.pycd']);