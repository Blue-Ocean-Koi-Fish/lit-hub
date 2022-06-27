
    // const arr = sampleText.split('***');
    // // setBookArray(arr);

    // let textRaw = arr[2].split('\n');
    // let textLines = [];

    // let chapters = [];
    // let content = [];

    // textRaw.map((line) => {
    //   if (line !== '\n') {
    //     textLines.push(line);
    //   }
    // });
    // setBookText(textRaw);




    {bookText ? bookText.map((line, i) => {
      if (line !== '\n') {
        return <div key={i}>{line}</div>
      }
    })
      : null}