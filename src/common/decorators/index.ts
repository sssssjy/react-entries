import 'reflect-metadata';


/**
 * 类装饰器
 * type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
 *
 * @params
 * target 类构造器
 *
 * @return
 * 若返回值 会替换该类的构造器声明
 *
 * 适合继承一个类并添加属性方法
 */

type Constructor = {new (...args: any[]): any}

function toString<T extends Constructor>(Base: T) {
    return class extends Base {
        toString(){
            return JSON.stringify(this)
        }
    }
}

@toString
class A{
    public foo = 'a';
    public num = 4;
}

console.log(new A().toString());

/**
 * 属性装饰器
 * type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
 *
 * @params
 * target 对静态成员来说是构造器 对实例来说是原型链
 * propertyKey 属性名
 *
 * @return
 * be ignored
 *
 * 收集信息 添加额外属性和方法
 */

//拦截注入
const firstLetterUpCase = str => 'on' + str.slice(0, 1).toUpperCase() + str.slice(1) + 'Change';

const observable = (target, properKey) => {
    const key = firstLetterUpCase(properKey);
    target[key] = function (fn : (prev, next) => void) {
        let prev = this[properKey];
        Reflect.defineProperty(this, properKey, {
            set(next){
                fn(prev, next);
                prev = next;
            }
        })
    }
}

class B{
    @observable
    a = '1';
    @observable
    foo = 11;
}

const b = new B() as any;
b.onAChange((prev, next) => console.log(`a change, prev: ${prev}, next: ${next}`))
b.onFooChange((prev, next) => console.log(`foo change, prev: ${prev}, next: ${next}`));

b.a = 3;
b.foo = '2344'
b.foo = '10'
b.foo = '10'
b.foo = '1445'

/**
 * 方法装饰器
 * type MethodDecorator = <T>(
 *   target: Object,
 *   propertyKey: string | symbol,
 *   descriptor: TypedPropertyDescriptor<T>
 * ) => TypedPropertyDescriptor<T> | void;
 *
 * @params
 * target 对静态属性来说是类的构造器 对于实例属性来说是类的原型链
 * propertyKey 属性名
 * descriptor 类的描述器 {value: any, writable: boolean, configurable: boolean, enumerable: boolean}
 *
 * @return
 * 若有返回 会替代属性的描述器
 */

const logger = (target, properKey, descriptor) => {
    const origion = descriptor.value;
    descriptor.value = function (...args) {
        console.log(args, 'args');
        const result = origion.call(this, ...args);
        console.log(result, 'result');
    }
}

class C{
    @logger
    add(x, y){
        return x + y;
    };
}

const c = new C();
c.add( 1, 5);

/**
 * 访问器装饰器
 * {get: function, set: function, enumerable: boolean, configurable: boolean}
 *
 * 与方法装饰器类似
 */

const setImmutable = (target, propertyKey, desciptor) => {
    const set = desciptor.set;
    desciptor.set = function (next) {
        set.call(this, {...next})
    }
}

class D {
    private privatPoint = {a: 1, b: 2};

    @setImmutable
    set point(value) {
        this.privatPoint = value;
    }
    get point() {
        return this.privatPoint
    }
}

const d = new D();
const point = {a: 2, b: 1};
d.point = point;
console.log(point, d.point, d.point === point);

/**
 * 参数装饰器
 * type ParameterDecorator = (
 *   target: Object,
 *   propertyKey: string | symbol,
 *   parameterIndex: number
 * ) => void;
 *
 * @params
 * target 对于静态属性来说是类的构造器 对于实例来说是类的原型链
 * propertyKey 方法名
 * parameterIndex 参数在方法中位置下标
 *
 * @return
 * be ignored
 */

//装饰器结合 实现参数类型校验
type Validator = (x: any) => boolean
const validatorMap : Record<string, Validator[]> = {};

// const typedDecoratorFactory = (validator: Validator): ParameterDecorator => {
//     return  (target, properKey, parameterIndex) => {
//         const validators = validatorMap[properKey as string] ?? [];
//         validators[parameterIndex] = validator;
//         validatorMap[properKey as string] = validators;
//     }
// }

function typedDecoratorFactory(validator: Validator): ParameterDecorator {
    return (_, key, index) => {
        const target = validatorMap[key as string] ?? [];
        target[index] = validator;
        validatorMap[key as string] = target;
    }
}

function validate(_:Object, key: string, descriptor: PropertyDescriptor) {
    const originFn = descriptor.value;
    descriptor.value = function (...args) {
        const validators = validatorMap[key];
        if (validators?.length) {
            args.forEach((item, index) => {
                const validator = validators[index];
                if (!validator) return;
                const result = validator(item);
                if (!result) throw new Error(`Failed for parameter: ${item} of the index: ${index}`)
            })
        }

        return originFn.call(this, ...args);
    }
}

// const isInt = typedDecoratorFactory(x => Number.isInteger(x));
// const isString = typedDecoratorFactory(x => typeof x === "string");
//
// class E{
//     @validate
//     say(@isString a: string, @isInt b: number) {
//         return Array(b).fill(a).join(',')
//     }
// }
//
// const e = new E();
// e.say('3', 7);
// // @ts-ignore
// e.say(1, '1');


// function validateA(
//     target: Object,
//     key: string,
//     descriptor: PropertyDescriptor
// ) {
//     const originalFn = descriptor.value;
//
//     // 获取参数的编译期类型
//     const designParamTypes = Reflect.getMetadata('design:paramtypes', target, key);
//
//     console.log(designParamTypes,'designParamTypes')
//
//     descriptor.value = function (...args: any[]) {
//         args.forEach((arg, index) => {
//
//             const paramType = designParamTypes[index];
//
//             const result = arg.constructor === paramType
//                 || arg instanceof paramType;
//
//             if (!result) {
//                 throw new Error(
//                     `Failed for validating parameter: ${arg} of the index: ${index}`
//                 );
//             }
//         });
//
//         return originalFn.call(this, ...args);
//     }
// }
//
// class F {
//     @validateA
//     sayRepeat(word: string, x: number) {
//         return Array(x).fill(word).join('');
//     }
// }
//
// const f = new F();
// f.sayRepeat('hello', 2); // pass
// f.sayRepeat('', 'lol' as any); // throw an error
