const TIMER_KEY = "terminal_timer";
const TIMER_DURATION = 10 * 60 * 1000;
const KEY = "trm_4";
let timerEnd = null;
let timerInterval = null;

const targetText = [
  {
    "text": "$\u0007\u0017%X\u0011R\u001e:E\u0001\u0017\u0003<Q~)$\u0011} ;,\u000bq0/",
    "pass": "\u0015\u001e\u001d7U",
    "question": "#\u001a\f+\u0014\u001d\u0001M+\\\u0011R\f<W\u0011\u0001\u001eW\u001b\u0016\b\u000b"
  },
  {
    "text": "'\u0013\u0001*@T<\u0002¶\u001a~;\u0000S\u0018\u0013\tM\u001b\u0007M<[\u0001\u001e\tY\u0015\u0019\b]\u0000RLUb\u001b\u001b\u000e6\u0014\u0001\u001c\bG\u0000\u0004:\u0014\u0010\u0017M/A\u000e\b\u0001:GT\u0006\u0002*GT\u0014\f6@T\u0002\f-\u0014\u0019\u001d\u0004s\u0014\u001e\u0007\u001e+QT\u0002\u0002*FT\u0006\u00026\u001a~Z=\f\u000eT\u001e\b,\u0014\u0006\u001d0Z\u0007\u0017\u001eG\u001b\u001c\u0019Q\u001aR\f1S\u0018\u0013\u0004,\u0014\u0011\u0006M)[\u001a\u0006Mµ@\u0006\u0017M*ZT\u001d\u0018P\u0011\u0007\u0015Y\u001b\u0006\u001e[\u0001R\u00181\u0014\u001a\u001d\u0000=F\u0011]\u000e7]\u0012\u0014\u001f:\u0014\u0011\u0006M/U\u0006\u0014\u00026GT\u0013\u001b:WT\u0002\u00021W\u0000\u0007\f+]\u001b\u001cD",
    "pass": ":\u001d2]\u0011",
    "question": "#\u001a\f+\u0014\u001d\u0001M&[\u0001\u0000M1U\u0019\u0017M`"
  },
  {
    "text": "7\u0017\u000e6\u0014\u0011\u0001\u0019Y\u001b\u001cM<U\u0010\u0017\f*\u0014\u0004\u001d\u0018-\u0014\u0000\u001d\u0004W\u0011\u0006\u0019:\u0014\u0015\u001c\u0003¶QZ\\C",
    "pass": "\u0011\u0000\f,Q\u0006",
    "question": "#\u001a\f+\u0014\u0003\u0013\u001eY\rR\u000b6F\u0007\u0006M8]\u0012\u0006M+[T\u000b\u0002*\u0014K"
  },
  {
    "text": ">\u0017M,U\u001d\u0001M.A\u0011R\u0019*\u0014\u001a\u0017M)[\u0001\u001e\f6GT\u0002\f,\u0014\u0005\u0007\b^\u0011R\u0019xÝ\u0017\u0000\u0004)Q\u0007R\u001d0A\u0006R\u0019>\u0014\u0012\u0019:\u0018",
    "pass": "\u0006\u001b\u00038",
    "question": "#\u001a\f+\u0014\u0003\u0013\u001eY\rR\u00197]\u0006\u0016M8]\u0012\u0006M+[T\u000b\u0002*\u0014K"
  },
  {
    "text": "\u0019\u0013\u0004,\u0014\u001eU\b1\u0014\u0004\u0000\u00029]\u0000\u0017\u001eB\u0001\u0001M.A\u0011R\u0019*\u0014\u001a\u0017M/[\u0001\u0000\u001f>GT\u0002\f,\u0014\u0019\u0017M-Ý\u0004\u001d\u0003;F\u0011RW\u001b",
    "pass": "\u0007\u001b\u0001)Q\u0006",
    "question": "#\u001a\f+\u0014\u0017\u001d\u00010FT\u0005\f,\u0014\u0019\u000bM+\\\u001d\u0000\tS\u001d\u0014\u0019@\u001bR\u00140ATM"
  },
  {
    "text": "5:%\u0017|XR\u0007xU\u001dR\u0002*V\u0018\u001bP\u0011R\u001d>F\u0018\u0017\u001fP\u0001R\u00196Y\u0011\u0000M/X\u0001\u0001M7U\u0001\u0006CU|1:(\u0017q<7%\u0017q~!\u0004@\u0001R\u0003:\u0014\u0006\u0018,G\u001d\u0001M/U\u0007RF\u0001\u0002*P\u0006\u0017M2Q\u0007R1]\u0013\u001f\b,\u0014\u0015\u0004\f1@T\u001e\fR\u001d\u001cCq\u001a~)?\u001ap519\u001ap)",
    "pass": "\u0001\u0001\b3Q\u0007\u0001",
    "question": "9\u000bM9]\u0006\u0001\u0019]\u0007R\u00197QT\u001e\b+@\u0011\u0000M&[\u0001R\f-QXx\u0000&\u0014\u0007\u0017\u000e0Z\u0010R\u0004,\u0014\u0000\u001a\bR\u0006\u0017\u0003<\\T\u0002\b-G\u001b\u001c\f3\u0014\u0004\u0000\u00021[\u0001\u001cM9[\u0006R\u00140A\u0006\u0001\b3RXx\u0000&\u0014\u0000\u001a\u0004-PT\u001b\u001eG\u0001\u0000\u001d-]\u0007\u001b\u00038X\rR\u0001:G\u0007\\g\u000b\\\u0011R\u001e*YT\u001d\u000bY\rR\u001d>F\u0000\u0001M6GT\u001d\u000bZ\u001bR\u001b>X\u0001\u0017M>@T\u0013\u00013\u001a"
  },
  {
    "text": "<3%\u001e|5:%\u001e\u0014BEg\u0015\u0013\u0015\u001bM-Ý\u0015\u001e\u0004,ÝT\u0013\u00185[\u0001\u0000\tx\\\u0001\u001bM.A\u0011R\u0007:\u0014\u0004\u0017\u0003,Q\u0007R@\u001b\u001bM=Q\u0015\u0007\u000e0A\u0004R\u001d3A\u0007R\u001c*QT\u0018J>]\u0019\u0017\u001f>]\u0007R\u0001xU\u0010\u001f\b+@\u0006\u0017Cq\u001a~?\u00021\u0014\u0004\u001f:\u0014\u0015\u0007\u001f>\u0014\u0016\u001b\b1@\u0006M*Z\u0011R\u0002/Ý\u0006\u0013\u00196[\u001aR\u001e*D\u0011\u0000M6Y\u0004\u001d\u001f+U\u001a\u0006\bE\u0001\u001bM)U\u0007R\n-U\u001a\u0016\b2Q\u001a\u0006M>R\u0012\u0017\u000e+Q\u0006R\u0001>\u0014\u0002\u001b\bP\u0011\u0001M/Q\u0006\u0001\u00021Z\u0011\u0001M;U\u001a\u0001M1[\u0000\u0000\bY\u0015\u001b\u001e0Z\u001a\bq>5\u001e\u0002-GT\u0018\bG\u0001\u001b\u001eU\u0018\u001eR\u0015\u001b\u001f:\u0014\u0018U/]\u0017\u0017\u001f6QZ\\C",
    "pass": "BE",
    "question": "#\u001a\f+\u0014\u0015\u0000\b@\u001c\u0017Mf\f\u0000\u001aM>Z\u0010RTf@\u001cR\t6S\u001d\u0006\u001e[\u0012Rέ\u000b"
  },
  {
    "text": "1\u001cM-Q\u0002\u0017\u0003>Z\u0000R\t:\u0014\u0018U/]\u0017\u0017\u001f6QXR\u0007xU\u001dR\f/D\u0011\u0000*\u0014\u0005\u0007\bY\u0015R\u000f>S\u0001\u0017M1\u0013\u0006\f6@T\u0002\u0001*GT\u0001\u0018-\u0014\u0019\u001d\u0003P\u001b\u001b\n+\u001a",
    "pass": "\u001a\u001d\u00197]\u001a\u0015",
    "question": "9\u000bM9]\u0006\u0001\u0019]\u0007R\fF\u0011\u0010\u0018+@\u0015\u001eA>\u0019\u000bM,Q\u0017\u001d\u0003;\u0014\u001d\u0001M>Z\u001b\u0006\u0005:FT\u0005\u0002-PT\u0014\u0002-\u0014\u0007\u001e\u00042\u001b\u0007\u001e\b1P\u0011\u0000B3Q\u0015\u001cB,_\u001d\u001c\u0003&\u001b\u0007\u001e\u00048\\\u0000^MUY\rR\u00197]\u0006\u0016M6GT\u0006\u0005:\u0014\u0018\u0017\u0019+Q\u0006R*q> \u001a\bG\u0001\u001fM0RT\u001f\u0014D\u0015\u0000\u0019,\u0014\u001d\u0001M+\\\u0011R\f=G\u0011\u001c\u000e:\u0014\u001b\u0014M:B\u0011\u0000\u0014+\\\u001d\u001c\nq"
  },
  {
    "text": ">U\f6\u0014\u0004\u0013\u00036E\u0001AR\u0015\u001b\u001eP\u0011\u001f\u0004r@\u001b\u0007\u001fs\u0014\u0017\u001a\b-W\u001cM+[\u0001\u0006M3QT\u0002\f-_\u001d\u001c\nX\u001b\u0006AX\u0011\u0001M>X\u0018\b,\u0014\u0011\u0006M3Q\u0007R\u000e>]\u0007\u0001\b,\u001a~8\bZ\u0011R\u0001xU\u001d\u0001M/U\u0007R\u0019-[\u0001\u0004XR\u000f>GZ",
    "pass": "0=#x`T\",\u0011}7",
    "question": "#\u001a\f+\u0013\u0007R\u001a-]\u0000\u0006\b1\u0014\u001d\u001cM=[\u0018\u0016M-Q\u0010R\u0001:@\u0000\u0017\u001f,\u0014\u001b\u001cM+\\\u0011R\u00000G\u0000R\u000b>Y\u001b\u0007\u001eY\u0015\u001c\u0018>XT\u0005\u00056W\u001cR\u0019>_\u0011\u0001M6@\u0007R\u0003>Y\u0011R\u000b-[\u0019R\u00197QT\u001c\u0002)Q\u0018R\u001a7]\u0017\u001aM7[\u0018\u0016\u001e@\u001c\u0017M>Z\u0007\u0005\b-\u0014\u0000\u001dM+\\\u0011R\u001c*Q\u0007\u0006\u00040ZT\u001d\u000bX\u001d\u0014\bq>=\u0006\u001eU\u0018\u0001\u0002D\u0006\u001d\u000f>V\u0018\u000bM2MT\u0014\f)[\u0001\u0000\u0004+QT\u001d\u001fG\u0011\u0011\u00021PT\u001c\u0002)Q\u0018R\u001e:F\u001d\u0017\u001eq"
  },
  {
    "text": ">U\f6\u0014\u0004\u001e\b*FR\b1\u0014\u0017\u001d\u0003;A\u001d\u0001\f1@T\u0011\u0005:NT\u001f\u00026\u001aZ\\g\u0015\u0013\u0015\u001bM-Ý\u0015\u001e\u0004,ÝT\u0003\u0018:\u0014\u0019\u0000:\u0014\u0007\u001bM+AT\u001c\bYS\u0013\u001eD\u0015\u0001M;[\u001a\u001cW\u0011\u0006\u0019:\u0014\u0016\u0013\n*QT\u0003\u00186\u0014\u001d\u001f\u0004+QT\u001e\f@\u001d\u0017\u00031QZ\\C",
    "pass": "0\u001b\u0019+[",
    "question": "5\u001c\f8F\u0015\u001fM0RT\u0013M/[\u001f\u0017\u00000ZT\u0005\u00056W\u001cR\u00010B\u0011\u0001M+[T\u001b\u00006@\u0015\u0006\bU\u001a\u000bM>Z\u0010R\f3XTHg6@0\u0006\u0002"
  },
  {
    "text": "7U\b,@T\u001f\u00021\u0014\u0007\u0017\u00183\u0014\u0002\u0000\f6\u0014\u0018\u001b\b1\u0014\u0004\u001a\u0014,]\u0005\u0007\bU\u0002\u0017\u000e@\u001b\u001bCUq\u0000R\u0007:\u0014\u001a\u0017M,A\u001d\u0001M/U\u0007R\u000e>D\u0015\u0010\u0001:\u0014\u0010\u0017M2\u0013\u001d\u001f\f8]\u001a\u0017\u001fG\u0015\u001c\u001eW\u0011R\u00016Q\u001a\\Cq",
    "pass": "\u0004\u001a\u0014,]\u0005\u0007\b",
    "question": ":\u0017\u001a+[\u001aR\b,@T\u001e\bD\u0000\bP\u0011R\u0001>\u0014Y_@r\u0019Y_@s\u0014\u0001\u001c\bU\u0017\u0006\u0004)]\u0000\b\u0019Y_@r\u0019Y_AA\u001aR\u00016B\u0006\u0017M;QT_@r\u0019Y_@r"
  },
  {
    "text": ">\u0017M<F\u001b\u001b\u001eE\u0001\u0017M5QT\u0006J>]\u0019\u0017Cq\u001a~4,\u0017|<:%\u0017|<:%\u0017>=9&\u0014?R\u00042\u0014\u0016\u0017\u00041ST\u0016\u00182VT*)",
    "pass": " \u001a\b`\u001c\u001b\u00034Q\u0006",
    "question": "<\u0013\u001b:\u0014\r\u001d\u0018Q\u0002\u0017\u001f\\\u0011\u0013\u001f;\u0014\u001b\u0014M>\u00147\u0017\u001e>FT\u0011\u0014/\\\u0011\u0000M`>#\u0019\u0005c\u001f\u001e\u001c1\\\u0001"
  },
  {
    "text": "6&:s\u0014\u001b\u0007\u0004[\u001aR\b,@T\u001e\b\u0006MR\f*^\u001b\u0007\u001f;\u0013\u001c\u0007\u0004wD\u001b\u0007\u001fY\u001b\u001bDq>1\u0006M0A\u001dR\u000exQ\u0007\u0006M>G\u0007\u0017\u0017P\u0011\u0000\u00036Ü\u0006\u0017M2]\u001a\u0007\u0019:\u0018T\u001f\f6G\u0007\u0001Cq\u001a~?\f6GT\u0013\u0018Y\u001b\u001b\u0003,\u0014\u0013M2QT\u0002\b-Y\u0011\u0006M;QT\u0006\bY\u001b\u001c\u0019-Q\u0006R\u0001>\u0014\u0010\u001b\u000b9Ý\u0006\u0017\u0003<QT\u0017\u0003+F\u0011R\u00181\u0014\u0004\u0000\u00028F\u0015\u001f\u0000:A\u0006R\b+\u0014\u0019\u001d\u0004\u001cØᵥÁv\u001a",
    "pass": "\u0010\u0013\u0019:",
    "question": "'\u001d\u0000:@\u001c\u001b\u00038\u0014=R\u001a6G\u001cR$W\u001b\u0007\u0001;\u0014\u0013\u001b\u001b:\u0014\r\u001d\u0018U\u001a\u0016M2QXR\u0004+\u0014\u001c\u001d\u0001;GT\u0006\u0005:\u0014\u0007\u0013\u0000:\u0014\u001a\u0013\u0000:\u0014\u0015\u0001M0Z\u0011R\u001e/Q\u0017\u001b\u000b6WT\u0006\u00042QT\u001b\u0003UT\u000b\b>FXR\u0004+GT\u0013M9F\u0001\u001b\u0019U\u0018\u001f\u0002,@T\u0013\u001eG\u0003\u0017\b+\u0014\u0015\u0001M&[\u0001R\f-QT\u0006\u0002Y\u0011\\"
  },
  {
    "text": "5\u001c\u0014(U\r\u0001\u001e,G\u0007\u0001Cq\u001aT3\u00057\\\u001cR\u0007:\u0014\u0010\u0017\u001b-U\u001d\u0001M/F\u001b\u0010\f=X\u0011\u001f\b1@T\u0006\bG\u001b\u0007\u0005>]\u0000\u0017\u001fA\u001a\u0017M=[\u001a\u001c\bR\u0006\b\\\u0011\u001b\u00031ZTMg\u0015QT\u001f\bG\u0001\u001b\u001eQ\u0019\u0002\u0002-@RWx\u001d",
    "pass": "\u0016\u001b\u001f+\\\u0010\u0013\u0014",
    "question": "'\u001d\u0000:@\u001c\u001b\u00038\u0014=R\u001a6G\u001cR$W\u001b\u0007\u0001;\u0014\u0017\u0017\u0001:V\u0006\u0013\u0019:\u0014\u0003\u001b\u00197\u0014\r\u001d\u0018s>\u001d\u0006M,\\\u0015\u0000\b,\u0014\u001d\u0006\u001eZ\u0015\u001f\bC\u001d\u0006\u0005UT\u0016\f&\u0014\u0000\u001a\f+\u0014\u0017\u001d\u0000:GT\u000b\b>F\u0018\u000bAU]\u0000R\u0000>F\u001f\u0001M+\\\u0011R\u00000Y\u0011\u001c\u0019UT\u0010\u0002&\u0014\u0012\u001b\u001f,@T\u0011\f2QT\u0006\u0002V\u0011^g]\u001aRJg\u0003XR\u00197U\u0000R\u000f6@\u0011R\u000f:W\u0015\u001f\b\\\u001d\u0001\u00190F\r\\"
  },
  {
    "text": "6=#\u0011qT4§\u000bqT<\"y=7(\u001aq17(\u0015USg\u0013[\u0002\u0017M&[\u0001RL",
    "pass": "\u0019\u001b\u001f0]\u0006",
    "question": "'\u001d\u0000:@\u001c\u001b\u00038\u0014=R\f2\u0018T\u000b\b+\u0014=R\f2\u0014\u001a\u001d\u0019U\u0018\u001b\u001b:\u0018~;M,\\\u001b\u0005M&[\u0001R\u00140A\u0006\u0001\b3RT\u0005\u0005:ZT\u000b\u0002*\u0014\u0018\u001d\u00024\u0014\u001d\u001c\u001e6P\u0011\\g\u0016\u0014\u0000\u0017\u00013\u0014\u001a\u001dM+F\u0001\u0006\u0005,\u0018T\u000b\b+\u0014\u001a\u0017\u001b:FT\u001e\u0004:\u0018~\u0013\u0003;\u0014=R\u00016B\u0011R\u001a7Q\u0006\u0017M-Q\u0012\u001e\b<@\u001d\u001d\u0003,\u0014\u0006\u0017\u001e6P\u0011\\Mwf\u0002\u00021G\u0011R\b1\u0014\u0012\u0000\f1Ó\u0015\u001b\u001ev"
  },
  {
    "text": ">U\f6\u0014\u0000\u0017\u00013Q\u0019\u0017\u0003+\u0014\u0004\u001e\u0018,\u0014\u0005\u0007\b^S\u0013\u00042Q\u0006\u0013\u0004,\u0014\u0000\u0017M;]\u0006\u0017Cq\u001a~?\f6GT\u0018\bZ\u0011R\u001e>]\u0007R\u001d>GT\u0001\u0004@\u0001R\u001b>GT\u0019-QT\u0014<\\\u0017M.A\u0011R\u0007:\u0014\u0000U\f6GT\u0014\f6@T\u0006\u0002*@T\u0007\u0003G\u001d\u0006\bC\u0011\u0010M:Z\u0017\u0000\u0014/@\\Cq\u0014\u001c\u0017\u0005:\\\u0011",
    "pass": "\u0015\u001c\n-M",
    "question": "5\u0006M+\\\u0011R\u000f:S\u001d\u001c\u00036Z\u0013R\u00029\u0014\u0011\u0013\u000e7\u0018~<\b)Q\u0006R\u0002*@T\u001d\u000bG\u001d\u0015\u0005+\u0018~5\u001f*Q\u0018\u001b\u00038\u0014\u0017\u0000\u0018:X\u0000\u000bM+\\\u001d\u0001M6GXx?:W\u001b\u001c\u001e+F\u0001\u0011\u00196Z\u0013R\u00197QT\u0014\u0004-G\u0000\u0001AUm\u001b\u0007M>F\u0011R\u0000&\u0014\u0019\u001b\u001e,]\u001a\u0015M3]\u001a\u0019"
  },
  {
    "text": "=\u001eM2QT\u0014\f*P\u0006\u0013\u0004+\u0014\u0001\u001c\bÝ\u0000\u0017\u001f1]\u0000\b^\u0001\u0001\u0019:\u0014\u0004\u001d\u0018-\u0014\u0010\u001b\u001e<A\u0000\u0017\u001fU\u0002\u0017\u000e@\u001b\u001bCq\u001a",
    "pass": "\u0011\u0006\b-Z\u001d\u0006\u0014",
    "question": "=\u0006M;F\u0015\u0015\u001e[\u001aR\u000b0F\u0011\u0004\b-\u0018T\u001b\u000bM\u001b\u0007M<F\u0015\u0005\u0001:PT\u0007\u001e6Z\u0013R\u00021X\rR\u00021QT\u0013\u001f2\u0014\u0000\u001dM<F\u001b\u0001\u001e@\u001c\u0017M:Z\u0000\u001b\u001f:\u0014\u0003\u001d\u001f3PXR\f9@\u0011\u0000M>W\u0017\u001d\u0000/X\u001d\u0001\u00056Z\u0013R\u00197]\u0007R\u00021W\u0011R\u000b0FT\u0017\f<\\T\u001e\u0004)]\u001a\u0015M+\\\u001d\u001c\n[\u001aR\b>F\u0000\u001aA@\u001c\u0017M9]\u0006\u0001\u0019G\u0011\u0011\u00021PT\u001d\u000b\u0019Y_@r\u0019Y_M(]\u0018\u001eM7U\u0002\u0017M/U\u0007\u0006C"
  },
  {
    "text": "5:%\u0017|T\u0017\u0019^S\u0013\u0004@\u0006\u001d\u0018)ÝT\u001e\fV\u0015\u0015\u0018:\u001aZ\\M:X\u0018\u0017M¶@\u0015\u001b\u0019P\u0015\u001c\u001eA\u001aR\u000e7[\u0001\nAY\u0015\u001b\u001eV\u001d\u0017\u0003G\u0001\u0000M/U\u0007R\f*G\u0007\u001bM<\\\u001b\u0007M.A\u0011R\u00190]TZCᵉ\u001a]",
    "pass": "\u0017\u0007\u00196Q\u0004\u001b\b",
    "question": "-\u001d\u0018\u001fT\"\u0004:>\\6\bY\u001b\u001cM/[\u001d\u001c\u0019P\u0011R\u001b*Q]"
  },
  {
    "text": ">\u0017M+F\u001b\u0007\u001b:GT\f]\u001a\u0014\u00041]\u0019\u0017\u0003+\u0014\u0010\u00003QT\u0003\u0018:\u0014\u0000\u0007M1QT\u0002\u0002*F\u0006\u0013\u001ep\u001c\u0002\u001d\u0018;F\u0015\u0001M\u0004∬T≪M≇\u0014\\RÝケT[M`i]R\u001d>GT\u001fJ¶W\u0006\u001b\u001f:\u0018T\u0013\u00010F\u0007R\u0007:\u0014\u0002\u0013\u0004,\u0014\u0011\u001cM/F\u001b\u0014\u0004+Q\u0006R\u001d0A\u0006R\t6F\u0011R\u000e:\u0014\u0005\u0007\b^\u0011R\u001d:Z\u0007\u0017\u001eq",
    "pass": "\u0018\u001d\u0001",
    "question": "8\u0017\f8A\u0011R\"9\u00148\u0017\n:Z\u0010\u0001Ax\u0015\u0007\n7]\u001a\u0015M\u0010A\u0000R!0A\u0010^M\u0013U\u000e\u0017\u001f{\u001a\u0017M\u0013U\u0007\u0013\n1U"
  },
  {
    "text": "=R\u00006G\u0007R\u00140AZ\\CUm\u001b\u0007\u001fW\u0001\u0006\bX\u0015\u0007\n7>-\u001d\u0018-\u0014\u001a\u001b\u000e:\u0014\u0007\u001f\u00043Q~+\u0002*FT\u001b\u0003+[\f\u001b\u000e>@\u001d\u001c\nG\u0019\u0017\u00013\u0014\u0015\u001c\t\\\u0001\u0015\u001eq\u001aZZCᵉ\u001a]x,7\\T\u0017\u0019^S\u0017\u001e/Ü\u0006\u0017M,]\u001a\u0011-Q\u0019\u0017\u0003+\u0014\u0005\u0007\b@\u0001R\u001d>G\u0007\u0017\u001f>GT\u0018\u0002*Q\u0006RY\u0015\u0015\u0004<\u0014\u0016\u001b\b1@\u0006MwY\u0015\u001b\u001eD\u0015\u0001M)Q\u001a\u0016\u001f:P\u001dR\t:Y\u0015\u001b\u0003s\u0014=R\u001a0ZS\u0006M=QT\u0006\u0005:F\u0011[AY\u001f\bU\u0002\u0017\u000eW\u001b\u001f\u0000:Z\u0000R\u00021\u0014\u0015R\f-F\u0006P\u0011R\u001d>F\u0018\u0017\u001fq",
    "pass": "\u0019\u001b\u001e,",
    "question": "=U\u0000G\u0015\u001b\tC\u001c\u0017\u0003G\u001b\u001f\b0Z\u0011R\u0004,\u0014\u001a\u001d\u0019\\\u0011\u0000\bs>5R\u00196@\u0018\u0017M9[\u0006R\fS\u001d\u0000\u0001\\\u0011\u001e\tP\u0011\u0013\u001fq>=\u001cM8U\u0019\u0017\u001e}T\u001f\b>ZT⁮\f3Y\u001b\u0001\u0019s\u0014\u0016\u0007\u0019Z\u001b\u0006M.A\u001d\u0006\bs ~3\u0003;\u0014=R\u001e7[\u0003R\u001a7U\u0000R\u00140AT\u0014\b:XT\u0005\u0005:ZT\u001d\u0018+\u0014\u001b\u0014M,]\u0013\u001a\u0019q"
  },
  {
    "text": "<\u001d\u00031Þ\u0000\u0017\u0000:Z\u0000^M5\u0013\u0015\u001bM/Q\u0001\u0000M.A\u0011R\u0019*\u0014\u001a\u0017M)Q\u0001\u001b\u00013Q\u0007R\u001d3A\u0007R\t:\u0014\u0019\u001d\u0004q\u001aZx >]\u0007R\u001e6\u0014\u0017U\b,@T\u001e\bW\u0015\u0001Cq\u001a~4\f6GT\u0018\u0018,@\u0011R\u0000:\u0014\u0018\u0017M;]\u0006\u0017C",
    "pass": "\u0012\u0017\f-",
    "question": "=R\n-[\u0003R\u001a7Q\u001aR\u00197QT\u0007\u00034Z\u001b\u0005\u0003W\u001b\u001f\b,\u0014\u001a\u0017\f-\u0018~;M(\\\u001d\u0001\u001d:FT\u0016\f1S\u0011\u0000M6ZT\u000b\u0002*FT\u0017\f-\u001a~;M<U\u001aR\u000b-Q\u0011\b\bM\u001b\u0007M(\\\u0011\u0000\bM\u001b\u0007M,@\u0015\u001c\ts> \u001a\u0002*S\u001cR$Q\f\u001b\u001e+\u0014\u001b\u001c\u0001&\u0014\u001d\u001cM&[\u0001\u0000M2]\u001a\u0016C"
  },
  {
    "text": ">U\f-F\u0006\b-U",
    "pass": "\u0011\u001c\t",
    "question": "=R\u000e0Y\u0011R\u001a7Q\u001aR\u00030@\u001c\u001b\u00038\u0014\u0012\u001d\u00013[\u0003\u0001M2QXx$W\u0018\u001d\u001e:\u0014\u0000\u001a\bV\u001b\u001d\u0006s\u0014=R\u001e:@T\u000b\u0002*\u0014\u0012\u0000\b:\u001a~;J2\u0014\u0015\u0006M+\\\u0011R\u000b6Z\u001d\u0001\u0005s\u0014\u001a\u001d\u0019@\u001c\u0017M,@\u0015\u0000\u0019s>=R\u0000>F\u001fR\u00197QT\u0002\u00026Z\u0000R\u001a7Q\u0006\u0017M+\\\u001d\u001c\n,\u0014\u0010\u0017\u001d>F\u0000\\"
  },
  {
    "text": "53,\u001ez-%,\u0006gXR\u000e7AT\u0011\u00021@\u0011\u001c\u0019E\u0001\u0017M+AT\u001c\bF\u0002\u00021P\u0006\u0013\u001eD\u0006\u001d\u000fD\u0015\u0001CU~\u0011R\u001d:A\fR\f;Y\u0011\u0006\u0019-QT\u0003\u0018:\u0014\u001e\u0017M)U\u001d\u0001M+\u0013\u0015\u0006\u0019:Z\u0010\u0000\bl0x%\u001e|5:,\u0017|5R\b+\u0014\u0000\u0007M/Q\u0001\nM-]\u0011\u001cM1\u0013\rR\u000b>]\u0006\u0017M,U\u001a\u0001M=F\u001d\u0001\b-\u0014\u0018\u0017M;Q\u0015\u0016\u00016Z\u0011RW/",
    "pass": "\u0018\u0013\u00188\\",
    "question": "=R\u000e>ZS\u0006M=QT\u001a\b3PXR\u000f*@T;M<U\u001aR\u000f:\u0014\u001c\u0017\f-PXx$G\u0004\u0000\b>PT\u001e\u00044QT\u0014\u0004-QT\u0005\u0004+\\\u001b\u0007\u0019UT\u0005\u0002-PZx$W\u001b\u001f\bC\u001c\u0017\u0003G\u001b\u001f\b+\\\u001d\u001c\n@\u001d\u0011\u00063Q\u0007R\u00140A\u0006R\u00006Z\u0010^g\u001eZ\u0010R\u0001:U\u0002\u0017M>\u0014\u0007\u001f\u00043QT\u0010\b7]\u001a\u0016C\u001c \u001a\b]\u001a\u0014\u00041]\u0000\u001b\u001b:\u0014\u0002\u0017\u001f=\u001a]"
  },
  {
    "text": ";\u0019M=Q\u001a\\Cq\u00146\u001d\u00031QT\u0014+QT\u001e\fV\u0011\u001e\u0001:\u0014\u0011\u0006M=F\u0015\u0004\u0002PS\u0013\u001b0]\u0006R\f+@\u0011\u001b\u0003+\u0014\u0018\u0013M9]\u001aR\t:\u0014\u0019\u0017\u001eD\u0011\u0006\u0004+Q\u0007R\t:B\u001d\u001c\b+@\u0011\u0001M~> U\b,\u0014\u0000\u0017\u00013Q\u0019\u0017\u0003+\u0014\u001d\u001c\u0019:X\u001d\u0015\b1@\u0011RLU~\u0011R\u0019xU\u001d\u001f\bq>Y!\u00042[\u001a",
    "pass": "\u001c\u0017\f-@",
    "question": "=\u0006\u001eY\rR\u001e:W\u001b\u001c\tS\u001d\u0014\u0019@\u001bR\u00140AZx:7U\u0000R\u0005>B\u0011R$S\u001d\u0004\b1\u0014\r\u001d\u0018@\u001c\u0013\u0019}T\u0005\u00021\u0013\u0000R\u0019>_\u0011R\u000f>W\u001fRR"
  }
];

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

const warning = document.getElementById("warning");
const scanline = document.getElementById("scanline");
const grantline = document.getElementById("grantline");
const grantText = document.getElementById("grantText");
const promptEl = document.getElementById("prompt");


const log = document.getElementById("log");
const input = document.getElementById("userInput");
const btn = document.getElementById("startBtn");

const upBtn = document.getElementById("upBtn");
const downBtn = document.getElementById("downBtn");

let DEBUG = false;
let msg = 0;
let frame = 0;
let animating = false;
let unlocked = false;
let warningTimeout = null;
let promptText = "";

const speed = 40;
const swapDelay = 10;

/* =========================
   MEMORY (persistent unlock state)
========================= */
const unlockedState = targetText.map(() => false);

/* =========================
   UTIL
========================= */
function randomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

function generateRandomString(len) {
  let s = "";
  for (let i = 0; i < len; i++) s += randomChar();
  return s;
}

function getDisplayText(i) {
  return unlockedState[i]
    ? decode(targetText[i]).text
    : generateRandomString(decode(targetText[i]).text.length);
}

/* =========================
   RENDER SYSTEM
========================= */
function render(activeText) {
  let html = "";

  const HISTORY = 2;
  const FUTURE = unlockedState[0] ? 5 : 0;

  // HISTORY (clamped properly)
  const start = Math.max(0, msg - HISTORY);
  for (let i = start; i < msg; i++) {
    const text = getDisplayText(i);
    const cls = unlockedState[i] ? "unlocked" : "locked";
    html += `<div class="${cls} prev">${text}</div>`;
  }

  // ACTIVE
  const activeClass = (unlockedState[msg] || unlocked) ? "unlocked" : "locked";
  html += `<div class="active ${activeClass}">${activeText}</div>`;

  // FUTURE
  for (let i = msg + 1; i <= msg + FUTURE && i < targetText.length; i++) {
    const text = getDisplayText(i);
    const cls = unlockedState[i] ? "unlocked" : "locked";
    html += `<div class="${cls} next">${text}</div>`;
  }

  log.innerHTML = html;
}

/* =========================
   SCRAMBLE ANIMATION
========================= */
function update() {
  if (!animating) return;

  const current = decode(targetText[msg]).text;
  let result = "";

  // LOCKED STATE → fully scrambled
  if (!unlocked) {
    result = generateRandomString(current.length);
    render(result);
    requestAnimationFrame(update);
    return;
  }

  // UNLOCKED → reveal animation
  const revealIndex = current.length - Math.floor(frame / speed);

  for (let i = 0; i < current.length; i++) {
    if (i >= revealIndex) {
      result += current[i];
    } else {
      result += (frame + i) % swapDelay === 0
        ? randomChar()
        : (log.dataset?.scramble?.[i] || randomChar());
    }
  }

  log.dataset.scramble = result;
  render(result);

  frame++;

  if (frame / speed <= current.length) {
    requestAnimationFrame(update);
  } else {
    animating = false;

    unlockedState[msg] = true;

    updateArrowState();
    if(unlockedState[0])
    {
        render(result);
    }
  }
}

/* =========================
   PASSWORD CHECK
========================= */
function startAnimation() {
    if (animating) return;

    startTimerIfNeeded();

    const value = input.value.trim();

    if (value.toUpperCase() !== decode(targetText[msg]).pass.toUpperCase()) {
    showWarning("ACCESS DENIED");
    triggerScanline();
    input.value = "";
    return;
    }

    unlocked = true;
    frame = 0;

    log.dataset.scramble = generateRandomString(decode(targetText[msg]).text.length);

    triggerGrantBeam(); 

    animating = true;
    update();
    updatePrompt();
}

/* =========================
   NAVIGATION
========================= */
function up() {
    if (animating) return;
    input.value = "";
    hideWarning(); 

    if (msg > 0) {
        msg--;
        frame = 0;
        unlocked = unlockedState[msg];

        render(
        unlockedState[msg]
            ? decode(targetText[msg]).text
            : generateRandomString(decode(targetText[msg]).text.length)
        );

        updateArrowState();
        updatePrompt();
    }
}

function down() {
    if (animating) return;
    input.value = "";
    hideWarning(); 

    if (!unlockedState[0]) {
        showWarning("ACCESS REQUIRED");
        triggerScanline();
        return;
    }

    if (msg < targetText.length - 1) {
        msg++;
        frame = 0;
        unlocked = unlockedState[msg];

        render(
        unlockedState[msg]
            ? decode(targetText[msg]).text
            : generateRandomString(decode(targetText[msg]).text.length)
        );

        updateArrowState();
        updatePrompt();
    }
}

/* =========================
   ARROW STATE CONTROL
========================= */
function updateArrowState() {
  upBtn.disabled = msg === 0;

  downBtn.disabled = !unlockedState[msg];
}

function saveTimer() {
  if (timerEnd) {
    localStorage.setItem(TIMER_KEY, String(timerEnd));
  }
}

function loadTimer() {
  const saved = localStorage.getItem(TIMER_KEY);

  if (!saved) return;

  const parsed = Number(saved);

  if (!isNaN(parsed)) {
    timerEnd = parsed;
  }
}

function startTimerIfNeeded() {
  if (timerEnd) return;

  timerEnd = Date.now() + TIMER_DURATION;
  localStorage.setItem(TIMER_KEY, String(timerEnd));

  const el = document.getElementById("timer");

  el.classList.add("active");
  updateTimerUI();
  startTimerLoop();
}

function updateTimerUI() {
  const el = document.getElementById("timer");
  if (!el || !timerEnd) return;

  const diff = timerEnd - Date.now();

  const hours   = Math.floor(diff / (60000 * 60) )
  const minutes = Math.floor(diff / 60000) % 60;
  const seconds = Math.floor((diff % 60000) / 1000);

  el.textContent =
    `SELF DESTRUCT · ${String(hours).padStart(2, "0")}H${String(minutes).padStart(2, "0")}M${String(seconds).padStart(2, "0")}`;
}

function startTimerLoop() {
  if (timerInterval) cancelAnimationFrame(timerInterval);

  function tick() {
    if (!timerEnd) return;

    const diff = timerEnd - Date.now();

    if (diff <= 0) {
      triggerSystemCollapse();
      return;
    }

    updateTimerUI();

    timerInterval = requestAnimationFrame(tick);
  }

  tick();
}

function showWarning(text) {
  warning.textContent = text;
  warning.classList.add("show");

  clearTimeout(warningTimeout);

  warningTimeout = setTimeout(() => {
    hideWarning();
  }, 1200);
}

function hideWarning() {
  warning.classList.remove("show");
}

function triggerScanline() {
  scanline.classList.remove("active");

  // restart animation
  void scanline.offsetWidth;

  scanline.classList.add("active");

  setTimeout(() => {
    scanline.classList.remove("active");
  }, 650);
}

function triggerGrantBeam() {
  // reset animation
  grantline.classList.remove("active");
  void grantline.offsetWidth;
  grantline.classList.add("active");

  // optional text
  if (grantText) {
    grantText.classList.remove("show");
    void grantText.offsetWidth;
    grantText.classList.add("show");
  }

  setTimeout(() => {
    grantline.classList.remove("active");
    if (grantText) grantText.classList.remove("show");
  }, 1200);
}

function triggerSystemCollapse() {
  const overlay = document.createElement("div");
  overlay.id = "wipeOverlay";
  document.body.appendChild(overlay);

  let progress = 0;

  const interval = setInterval(() => {
    progress += 2;

    overlay.style.background = `
      linear-gradient(
        to bottom,
        #0f0f0f ${progress}%,
        black ${progress + 10}%,
        transparent ${progress + 20}%
      )
    `;

    overlay.style.filter = `contrast(2) brightness(${1 - progress / 100})`;

    // scramble timer text
    const el = document.getElementById("timer");
    if (el) el.textContent = generateRandomString(20);

    if (progress >= 120) {
      clearInterval(interval);

      // full blackout
      overlay.style.background = "black";

      setTimeout(() => {
        localStorage.clear();
        triggerBIOSReboot();
      }, 500);
    }
  }, 30);
}

function hydrateTimer() {
  const el = document.getElementById("timer");
  if (!el) return;

  const saved = localStorage.getItem(TIMER_KEY);
  if (!saved) return;

  timerEnd = Number(saved);
  const diff = timerEnd - Date.now();

  if (diff <= 0) {
    localStorage.removeItem(TIMER_KEY);
    timerEnd = null;
    return;
  }

  // set correct initial text
  el.textContent = formatTime(diff);

  // make it visible immediately if timer is already active
  el.classList.add("active");

  startTimerLoop();
}

/* =========================
   EVENTS
========================= */
btn.addEventListener("click", startAnimation);
upBtn.addEventListener("click", up);
downBtn.addEventListener("click", down);
requestAnimationFrame(() => {
  el.classList.add("active");
});
document.addEventListener("keydown", (e) => {
  input.focus();


  e.preventDefault();

  if (e.key === "Enter") {
    startTimerIfNeeded();
    startAnimation();
    return;
  }

  if (e.key === "Backspace") {
    input.value = input.value.slice(0, -1);
    return;
  }


  if (e.key.length === 1) {
    input.value += e.key;
  }
});

function updatePrompt() {
  if (!promptEl) return;

  promptEl.textContent = decode(targetText[msg])?.question || "";
}

function initTimer() {
  const el = document.getElementById("timer");
  if (!el) return;

  const saved = localStorage.getItem(TIMER_KEY);

  if (saved) {
    timerEnd = Number(saved);
  }

  if (!timerEnd) return;

  const diff = timerEnd - Date.now();

  if (diff <= 0) {
    localStorage.removeItem(TIMER_KEY);
    timerEnd = null;
    return;
  }

  el.classList.add("active");
  updateTimerUI();
  startTimerLoop();
}

function xor(str, key = KEY) {
  return [...str]
    .map((c, i) =>
      String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    )
    .join("");
}

function decode(node) {
  return {
    text: xor(node.text, KEY),
    pass: xor(node.pass, KEY),
    question: xor(node.question, KEY)
  };
}

function triggerBIOSReboot() {
  const bios = document.getElementById("bios");
  if (!bios) return;

  bios.classList.add("show");

  const lines = [
    "BIOS v3.12 INITIALIZING...",
    "CHECKING MEMORY... OK",
    "VERIFYING SYSTEM INTEGRITY... FAIL",
    "FORCING EMERGENCY RESET...",
    "REBUILDING KERNEL STACK...",
    "",
    "BOOT DEVICE: TERMINAL NODE",
    "LOADING SYSTEM MODULES...",
    "████████████████████████",
    "COMPLETE",
    "",
    "RESTARTING..."
  ];

  let i = 0;

  const interval = setInterval(() => {
    if (i < lines.length) {
      bios.textContent += lines[i] + "\n";
      i++;
    } else {
      clearInterval(interval);

      setTimeout(() => {
        // fade effect before reload
        document.body.style.transition = "opacity 1.2s ease";
        document.body.style.opacity = "0";

        setTimeout(() => {
          localStorage.clear(); // wipe state clean
          location.reload();
        }, 1200);

      }, 800);
    }
  }, 120);
}

/* =========================
   INIT
========================= */

msg = 0;
unlocked = false;

render(
  unlockedState[0]
    ? decode(targetText[0]).text
    : generateRandomString(decode(targetText[0]).text.length)
);

updateArrowState();

initTimer();
updatePrompt();
